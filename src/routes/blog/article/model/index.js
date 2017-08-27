import * as service from '../service';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid'

import { message } from 'antd';
export default modelExtend(grid(service, '/blog/article', 'article'), {
  namespace: 'article',

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const o = yield select(({ article }) => article);
      const params = {
        current: o.current,
        tableName: o.tableName,
        size: o.size,
        keyword: o.keyword,
        ...payload
      }
      yield put({ type: 'superFetch', payload: params });
    },
    *queryById({ payload }, { put, select, call }) {
      yield put({
        type: 'edit/initEdit'
      });
      yield put(routerRedux.push({ pathname: '/blog/edit', query: { id: payload } }))
    },
    *confirm({ payload }, { put, select, call }) {
      const data = yield call(service.confirm, payload.id);
      yield put({ type: 'app/result', payload: { data, namespace: 'article' } });
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.article.current);
      yield put({ type: 'fetch', payload: { current } });
    },
    *topHandler({ payload }, { put, select, call }) {
      const data = yield call(service.topHandler, payload);
      yield put({ type: 'app/result', payload: { data, namespace: 'article' } });
    }
  }
});
