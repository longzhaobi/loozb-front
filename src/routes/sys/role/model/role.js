import * as service from '../service/role';

import {message} from 'antd';
export default {
  namespace: 'role',
  state: {
    data: [],
    total: 0,
    current: 0,
    size:20,
    selectedRowKeys:[],
    keyword:null,

    colsData:[],
    treeData:[],
    authData:[],
    treePid:1,
    roleId:0

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/sys/role') {
          dispatch({ type: 'fetch', payload: {current:1, size:20, ...query}});
        }
      });
    },
  },
  reducers: {
    fetchSuccess(state, { payload: { data, total, current, keyword } }) {
      return { ...state, data, total, current, selectedRowKeys:[], keyword };
    },
    initKeyword(state, { payload }) {
      return {...state, keyword:payload};
    },
    onChangeSelectedRowKeys(state, {payload}) {
      return {...state, selectedRowKeys:payload};
    },
    fetchAuthSuccess(state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      yield put({type:'initKeyword', payload:payload.keyword});
      const response = yield call(service.fetch, payload);
      if(response) {
        const {data} = response;
        if(data) {
          const {total, current} = data;
          yield put({
            type: 'fetchSuccess',
            payload: {data:data.data, total, current, keyword: payload.keyword
            }
          });
        }
      }
    },
    *remove({ payload }, { call, put, select }) {
      let response = null;
      if(payload instanceof Array) {
        const size = payload.length;
        for(let i = 0; i < size; i++) {
          yield put({ type: 'app/changeMsg',payload:`共${size}条，第${i + 1}正在删除中` });
          response = yield call(service.remove, payload[i]);
          if(response) {
            const {data} = response;
            if(data && data.httpCode === 200) {
              message.success( `第${i+1}条删除成功`);
            } else {
              message.error( `第${i+1}条删除失败`);
            }
          }
        }
        yield put({ type: 'app/changeMsg',payload:null });
      } else {
        response = yield call(service.remove, payload.id);
      }
      yield put({ type: 'app/result',payload:{response, namespace:'role'} });
    },
    *update({ payload:params, callback }, { call, put }) {
      callback(yield call(service.update, params));
    },
    *create({payload:params, callback}, { call, put }) {
      callback(yield call(service.create, params));
    },
    *fetchAuth({ payload, callback }, { call, put, select}) {
      const resource = yield call(service.fetchResources);//获取资源
      const columns = yield call(service.fetchColumns);//获取权限表头
      if(resource && columns) {
        const data1 = resource.data;
        const data2 = columns.data;
        if(data1 && data2) {
          if(data1.httpCode === 200 && data2.httpCode === 200) {
            yield put({
              type: 'fetchAuthList',
              payload: {...payload, treeData:data1.data, colsData:data2.data},
              callback
            });
          } else {
            messeage.error("抱歉，获取权限信息失败");
          }
        } else {
          messeage.error("抱歉，获取权限信息失败");
        }
      } else {
        messeage.error("抱歉，获取权限信息失败");
      }
    },
    *fetchAuthList({payload, callback}, {call, put}) {
      const {roleId, pid, treeData, colsData} = payload;
      const response = yield call(service.queryAuth, {roleId, pid});
      if(response) {
        const {data} = response;
        if(data) {
          if(data.httpCode === 200) {
            const authData = data.data;
            if(treeData && colsData) {
              callback(treeData, colsData, authData);
            } else {
              callback(authData);
            }
          }
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
};
