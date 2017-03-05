import * as service from '../service/user';
export default {
  namespace: 'user',
  state: {
    data: [],
    total: 0,
    pages: 0,
    size:20,
    selectedRowKeys:[],

    roles:[]
  },
  reducers: {
    fetchSuccess(state, { payload: { data, total, pages } }) {
      return { ...state, data, total, pages, selectedRowKeys:[] };
    },
    fetchRolesSuccess(state, {payload:roles}) {
      return {...state, roles};
    }
  },
  effects: {
    *fetch({ payload}, { call, put, select }) {
      const user = yield select(state => state.user);
      const query = {
        pages: 1,
        size: user.size,
        ...payload
      }
      const response = yield call(service.fetch, query);
      if(response) {
        const {data} = response;
        if(data) {
          const {total, pages} = data;
          yield put({
            type: 'fetchSuccess',
            payload: {
              data:data.data,
              total:total,
              pages: pages
            },
          });
        }
      }
    },
    *remove({ payload: id }, { call, put }) {
      const response = yield call(service.remove, id);
      yield put({ type: 'system/result',payload:{response, namespace:'user'} });
    },
    *update({ payload:{id, params} }, { call, put }) {
      const response = yield call(service.update, {...params, id});
      yield put({ type: 'system/result',payload:{response, namespace:'user'} });
    },
    *create({ payload: params }, { call, put }) {
      const response = yield call(service.create, params);
      yield put({ type: 'system/result',payload:{response, namespace:'user'} });
    },
    *fetchRoles({ payload }, { call, put, select}) {
      const response = yield call(service.fetchRoles);
      if(response) {
        const {data} = response;
        if(data) {
          if(data.httpCode === 200) {
            yield put({type: 'fetchRolesSuccess', payload:data.data});
          }
        }
      }
    },
    *auth({ payload:{id, params} }, { call, put }) {
      const response = yield call(service.auth, id, params);
      yield put({ type: 'system/result',payload:{response, namespace:'user'} });
    },
    *reload(action, { put, select }) {
      const pages = yield select(state => state.user.pages);
      yield put({ type: 'fetch', payload: { pages } });
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/sys/user') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
