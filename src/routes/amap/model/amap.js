import {hashHistory, routerRedux} from 'dva/router';
import {message} from 'antd';
export default {
  namespace: 'amap',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/amap') {
          // dispatch({ type: 'fetch', payload: {...query}});
          console.log("进入高德地图功能演示模块");
        }
      });
    }
  },
  effects: {

  },
  reducers: {

  }
};
