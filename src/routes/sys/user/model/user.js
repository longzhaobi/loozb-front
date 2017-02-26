import * as service from '../service/user';

export default {
  namespace: 'user',
  state: {
    data: [],
    total: 0,
    pages: 0,
    size:20,
    selectedRowKeys:[],
    modalVisible:false
  },
  reducers: {
    save(state, { payload: { data, total, pages } }) {
      return { ...state, data, total, pages };
    },
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
          yield put({
            type: 'save',
            payload: {
              data:data.data,
              total:data.total,
              pages: data.pages
            },
          });
        }
      }
    },
    *remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
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
