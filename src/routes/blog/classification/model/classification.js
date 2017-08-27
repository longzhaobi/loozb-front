import * as service from '../service/classification';

import { message } from 'antd';
export default {
  namespace: 'classification',
  state: {
    data: [],
    total: 0,
    current: 0,
    size: 20,
    selectedRowKeys: [],
    keyword: null

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/blog/classification') {
          dispatch({ type: 'fetch', payload: { current: 1, size: 20, ...query } });
        }
      });
    },
  },
  reducers: {
    fetchSuccess(state, { payload: { data, total, current, keyword } }) {
      return { ...state, data, total, current, selectedRowKeys: [], keyword };
    },
    initKeyword(state, { payload }) {
      return { ...state, keyword: payload };
    },
    onChangeSelectedRowKeys(state, { payload }) {
      return { ...state, selectedRowKeys: payload };
    },
    fetchAuthSuccess(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      yield put({ type: 'initKeyword', payload: payload.keyword });
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
    *remove({ payload }, { call, put, select }) {
      let response = null;
      if (payload instanceof Array) {
        const size = payload.length;
        for (let i = 0; i < size; i++) {
          yield put({ type: 'app/changeMsg', payload: `共${size}条，第${i + 1}正在删除中` });
          response = yield call(service.remove, payload[i]);
          if (response) {
            const { data } = response;
            if (data && data.httpCode === 200) {
              message.success(`第${i + 1}条删除成功`);
            } else {
              message.error(`第${i + 1}条删除失败`);
            }
          }
        }
        yield put({ type: 'app/changeMsg', payload: null });
      } else {
        response = yield call(service.remove, payload.id);
      }
      yield put({ type: 'app/result', payload: { response, namespace: 'classification' } });
    },
    *update({ payload: params, callback }, { call, put }) {
      callback(yield call(service.update, params));
    },
    *create({ payload: params, callback }, { call, put }) {
      callback(yield call(service.create, params));
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.classification.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
};
