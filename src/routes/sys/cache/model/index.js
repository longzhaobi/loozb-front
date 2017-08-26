import * as service from '../service';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid';

import { message } from 'antd';
export default modelExtend(grid(service, '/sys/cache', 'cache'), {
  namespace: 'cache',
  state: {
    table: [],
    tableName: 'sys_user'
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const o = yield select(({ cache }) => cache);
      const params = {
        current: o.current,
        tableName: o.tableName,
        size: o.size,
        keyword: o.keyword,
        ...payload
      }
      yield put({ type: 'superFetch', payload: params });
    },
    *removeCache({ payload }, { call, put, select }) {
      const data = yield call(service.removeCache, {cacheKey: payload});
      if (data) {
        message.success("清除所有缓存成功");
        yield put({ type: 'fetch' });
      }
    },
    *removeCurrentCache({ payload }, { call, put, select }) {
      const data = yield call(service.removeCurrentCache, {table: payload});
      if (data) {
        message.success("清除当前缓存成功");
        yield put({ type: 'fetch' });
      }
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.cache.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
});
