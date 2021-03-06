import * as service from '../service';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid'

export default modelExtend(grid(service, '/sys/user', 'user'), {
  namespace: 'user',

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const user = yield select(({ user }) => user);
      const params = {
        current: user.current,
        size: user.size,
        keyword: user.keyword,
        ...payload
      }
      yield put({ type: 'superFetch', payload: params });
    },
    *sendMessage({ payload }, { put, select, call }) {
      const {user} = yield select(({ app }) => app);
      const { message } = payload;
      const userIds = yield select(({ user }) => user.selectedRowKeys);
      return yield call(service.sendMessage, {userIds, data:{message, fromUser: user.username}})
    },
    *judgeExist({ payload, callback }, { call, put }) {
      callback(yield call(service.judgeExist, payload));
    },
    *fetchRoles({ payload, callback }, { call, put, select }) {
      callback(yield call(service.fetchRoles));
    },
    *auth({ payload: { id, param }, callback }, { call, put }) {
      callback(yield call(service.auth, id, param));
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.user.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
});
