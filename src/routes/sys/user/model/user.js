import * as service from '../service/user';
export default {
  namespace: 'user',
  state: {
    data: [],
    total: 0,
    pages: 0,
    size:20,
    selectedRowKeys:[],
    keyword:null,

    roles:[]
  },
  reducers: {
    fetchSuccess(state, { payload: { data, total, pages, keyword } }) {
      return { ...state, data, total, pages, selectedRowKeys:[], keyword };
    },
    fetchRolesSuccess(state, {payload:roles}) {
      return {...state, roles};
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const user = yield select(state => state.user);
      const query = {
        pages: user.pages,
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
              pages: pages,
              keyword: payload.keyword
            },
          });
        }
      }
    },
    *remove({ payload: id }, { call, put }) {
      const response = yield call(service.remove, id);
      yield put({ type: 'system/result',payload:{response, namespace:'user'} });
    },
    *update({ payload:params, callback }, { call, put }) {
      callback(yield call(service.update, params));
    },
    *create({payload:params, callback}, { call, put }) {
      callback(yield call(service.create, params));
    },
    *fetchRoles({ payload, callback }, { call, put, select}) {
      callback(yield call(service.fetchRoles));
    },
    *auth({ payload:{id, params}, callback }, { call, put }) {
      callback(yield call(service.auth, id, params));
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
          dispatch({ type: 'fetch', payload: {...query, pages:1 }});
        }
      });
    },
  },
};
