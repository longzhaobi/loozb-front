import { hashHistory, routerRedux } from 'dva/router';
import * as service from '../services/chat';
import { message } from 'antd';
import cookie from 'js-cookie';
export default {
  namespace: 'chat',
  state: {
    notice: []
  },
  subscriptions: {

  },
  effects: {
    *onlineUser({ payload }, { put, select, call }) {
      return yield call(service.onlineUser, payload);
    },
  },
  reducers: {

  }
};
