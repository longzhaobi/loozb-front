import { hashHistory, routerRedux } from 'dva/router';
import * as service from '../services/app';
import { message } from 'antd';
import cookie from 'js-cookie';
export default {
  namespace: 'app',
  state: {
    menu: [],
    menuStyle: 'max',
    user: {},
    permission: [],
    msg: null,
    online: 0,
    //循环删除时，如果为true，则取消删除
    break: false
  },
  subscriptions: {

  },
  effects: {
    *login({ payload }, { put, select, call }) {
      const data = yield call(service.login, payload);
      if (data) {
        const o = data.data;
        cookie.set('loozb_token', o.token, { expires: 7 });
        yield put(routerRedux.push('/'));
      }
    },
    *register({ payload }, { put, select, call }) {
      const data = yield call(service.register, payload);
      if (data) {
        message.success("注册成功");
      }
    },
    *saveErrorsInfo({ payload }, { put, select, call }) {
      const params = {
        ...payload,
        instance: 'React for JavaScript'
      }
      yield call(service.saveErrorsInfo, params);
    },
    *result({ payload: { data, namespace }, onHander }, { put, select }) {
      if (data) {
        if (typeof onHander === 'function') {
          onHander(data);
        } else {
          message.success('操作成功');
        }
        yield put({ type: `${namespace}/reload` });
      }
    },
    *logout({ payload }, { put, select, call }) {
      const data = yield call(service.logout);
      window.location.href = baseUrl + '/#/login';
    },
    *current({ payload, callback }, { call, put }) {
      const data = yield call(service.current)
      if (data) {
        const d = data.data;
        yield put({
          type: 'init',
          payload: { user: d.sysUser, online: data.online, menu: d.hasMenus }
        });
        if (typeof callback === 'function') {
          callback(d);
        }
      } else {
        if (typeof callback === 'function') {
          callback();
        }
      }
    },
    *updatePassword({ payload, callback }, { call, put, select }) {
      callback(yield call(service.updatePassword, payload));
    },
    *verifyAuth({ payload, callback }, { call, put }) {
      const data = yield call(service.verifyAuth, { code: payload })
      if (data) {
        if (typeof callback === 'function') {
          callback(data);
        }
      } else {
        if (typeof callback === 'function') {
          callback();
        }
      }
    },
    *fetchDics({ payload, callback }, { call, put }) {
      const response = yield call(service.fetchDics, { code: payload });
      if (response) {
        callback(response.data);
      } else {
        callback({});
      }
    },
  },
  reducers: {
    queryMenuSuccess(state, action) {
      return { ...state, menu: action.payload };
    },
    switchClick(state, action) {
      return { ...state, menuStyle: action.payload }
    },
    changeMsg(state, action) {
      return { ...state, msg: action.payload };
    },
    setCurrentUser(state, action) {
      return { ...state, ...action.payload }
    },
    init(state, action) {
      return { ...state, ...action.payload }
    }
  }
};
