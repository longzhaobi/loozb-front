import * as service from '../service/permission';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid';

import {message} from 'antd';
export default modelExtend(grid(service, '/sys/permission'), {
  namespace: 'permission',
  state: {

  },
  subscriptions: {
  },
  reducers: {
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const o = yield select(({ permission }) => permission);
      const params = {
        current: o.current,
        size: o.size,
        keyword: o.keyword,
        ...payload
      }
      yield put({ type: 'superFetch', payload: params });
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.permission.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
});
