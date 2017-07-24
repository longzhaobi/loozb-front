import * as service from '../service/role';

import modelExtend from 'dva-model-extend';
import grid from '../../../../models/grid'

import {message} from 'antd';
export default modelExtend(grid(service, '/sys/role'), {
  namespace: 'role',
  state: {
    colsData:[],
    treeData:[],
    authData:[],
    treePid:1,
    roleId:0

  },
  subscriptions: {
  },
  reducers: {
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const o = yield select(({ role }) => role);
      const params = {
        current: o.current,
        size: o.size,
        keyword: o.keyword,
        ...payload
      }
      yield put({ type: 'superFetch', payload: params });
    },
    
    *fetchAuth({ payload, callback }, { call, put, select}) {
      const resource = yield call(service.fetchResources);//获取资源
      const columns = yield call(service.fetchColumns);//获取权限表头
      if(resource && columns) {
        yield put({
          type: 'fetchAuthList',
          payload: {...payload, treeData:resource.data, colsData:columns.data},
          callback
        });
      }
    },
    *fetchAuthList({payload, callback}, {call, put}) {
      const {roleId, pid, treeData, colsData} = payload;
      const data = yield call(service.queryAuth, {roleId, pid});
      if(data) {
        const authData = data.data;
        if(treeData && colsData) {
          callback(treeData, colsData, authData);
        } else {
          callback(authData);
        }
      }
    },
    *doAuth({ payload, callback }, { call, put }) {
      callback(yield call(service.doAuth, payload));
    },
    *reload(action, { put, select }) {
      const current = yield select(state => state.role.current);
      yield put({ type: 'fetch', payload: { current } });
    }

  }
});
