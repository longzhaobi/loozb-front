import * as service from '../service';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid';

import {message} from 'antd';
export default modelExtend(grid(service, '/sys/resource'), {
  namespace: 'resource',

  reducers: {
    fetchSuccess(state, { payload: { data, keyword } }) {
      return { ...state, data, selectedRowKeys:[], keyword };
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const data = yield call(service.fetch, payload);
      if(data) {
        yield put({
          type: 'fetchSuccess',
          payload: {data:data.data, keyword: payload.keyword}
        });
      }
    },
    *fetchPermission({ callback }, { call }) {
      callback(yield call(service.fetchPermission));
    },
    *reload(action, { put, select }) {
      yield put({ type: 'fetch' });
    }

  }
});
