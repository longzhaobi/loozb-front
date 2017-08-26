import * as service from '../service';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid';

import {message} from 'antd';
export default modelExtend(grid(service, '/sys/session', 'session'), {
  namespace: 'session',

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const o = yield select(({ session }) => session);
      const params = {
        current: o.current,
        size: o.size,
        keyword: o.keyword,
        ...payload
      }
      yield put({ type: 'superFetch', payload: params });
    },
    *remove({ payload }, { call, put, select }) {
      const data = yield call(service.remove, payload.token);
      if(data) {
        yield put({ type: 'fetch'});
      }
    },
    *removeAllOnline({ payload }, { call, put, select }) {
      const data = yield call(service.removeAllOnline);
      if(data) {
        yield put({ type: 'fetch'});
      }
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.session.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
});
