import * as service from '../service/dic';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid'

import { message } from 'antd';
export default modelExtend(grid(service, '/sys/dic'), {
  namespace: 'dic',
  state: {

  },
  subscriptions: {
  },
  reducers: {
    fetchAuthSuccess(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const dic = yield select(({ dic }) => dic);
      const params = {
        current: dic.current,
        size: dic.size,
        keyword: dic.keyword,
        ...payload
      }
      yield put({ type: 'superFetch', payload: params });
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.dic.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
});
