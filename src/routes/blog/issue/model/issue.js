import * as service from '../service/issue';

export default {
  namespace: 'issue',
  state: {
    article:{}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/blog/issue') {
          dispatch({ type: 'fetch', payload: query.id});
        }
      });
    },
  },
  reducers: {
    fetchSuccess(state, { payload: { data} }) {
      return { ...state, article:data};
    },
  },
  effects: {
    *fetch({payload}, { call, put }) {
      const response = yield call(service.fetch, payload);
      if(response) {
        const {data} = response;
        if(data.httpCode === 200) {
          yield put({
            type: 'fetchSuccess',
            payload: {data:data.data}
          });
        }
      }
    },
    *create({payload:params, callback}, { call, put }) {
      callback(yield call(service.create, params));
    },
    *fetchClassifications({ payload, callback }, { call, put, select}) {
      callback(yield call(service.fetchClassifications));
    }
  }
}
