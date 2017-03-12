import * as service from '../service/table';

import {message} from 'antd';
export default {
  namespace: 'table',
  state: {
    data: [],
    table:[],
    tableName:'',
    tableComment:''

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/sys/table') {
          dispatch({ type: 'fetchTable', payload: { ...query}});
        }
      });
    },
  },
  reducers: {
    fetchTableSuccess(state, { payload: { data } }) {
      return { ...state, table:data };
    },
    fetchColumnSuccess(state, { payload: { data, tableName, tableComment } }) {
      return { ...state, data, tableComment, tableName };
    }
  },
  effects: {
    *fetchTable({ payload }, { call, put, select }) {
      const response = yield call(service.fetchTable, payload);
      if(response) {
        const {data} = response;
        if(data && data.httpCode === 200) {
          yield put({
            type: 'fetchTableSuccess',
            payload: {data:data.data}
          });
        }
      }
    },
    *fetchColumn({ payload }, { call, put, select }) {
      const { tableName, tableComment, keyword } = payload;
      const response = yield call(service.fetchColumn, { tableName, keyword });
      if(response) {
        const {data} = response;
        if(data && data.httpCode === 200) {
          yield put({
            type: 'fetchColumnSuccess',
            payload: {data:data.data, tableName, tableComment}
          });
        }
      }
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.table.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
};
