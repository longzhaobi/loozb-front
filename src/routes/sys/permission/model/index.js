import * as service from '../service';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid';

import {message} from 'antd';
export default modelExtend(grid(service, '/sys/permission', 'permission'), {
  namespace: 'permission',

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
