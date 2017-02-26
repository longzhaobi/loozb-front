import * as service from '../service/user';

export default {
  namespace: 'user',
  state: {
    data: [],
    total: 0,
    pageNum: 0,
    pageSize:20,
    selectedRowKeys:[],
    modalVisible:false
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload}, { call, put, select }) {
      console.log(11);
      const user = yield select(state => state.user);
      const query = {
        pageNum: 1,
        pageSize: user.pageSize,
        ...payload
      }
      console.log(service);
      const response = yield call(service.fetch, query);
      if(response) {
        const {data} = response;
        if(data) {
          console.log(data);
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
