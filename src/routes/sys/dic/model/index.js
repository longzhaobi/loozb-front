import * as service from '../service';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid'

import { message } from 'antd';
export default modelExtend(grid(service, '/sys/dic', 'dic'), {
  namespace: 'dic',

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const dic = yield select(({ dic }) => dic);
      const params = {
        current: dic.current,
        size: dic.size,
        keyword: dic.keyword,
        ...payload
      }
      const data = yield call(service.fetch, payload);
      if (data) {
        const { total, current } = data;
        yield put({
          type: 'fetchSuccess',
          payload: {
            data: data.data, total, current, keyword: payload.keyword
          }
        });
      }
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.dic.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
});
