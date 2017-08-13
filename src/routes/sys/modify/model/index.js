import * as service from '../service';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid'

export default modelExtend(grid(service, '/sys/modifyinfo', 'modifyInfo'), {
  namespace: 'modifyInfo',
  state: {
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const o = yield select(({ modifyInfo }) => modifyInfo);
      const params = {
        current: o.current,
        size: o.size,
        keyword: o.keyword,
        ...payload
      }
      yield put({ type: 'superFetch', payload: params });
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.modifyInfo.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
});
