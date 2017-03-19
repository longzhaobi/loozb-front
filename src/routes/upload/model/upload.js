import {hashHistory, routerRedux} from 'dva/router';
import {message} from 'antd';
export default {
  namespace: 'upload',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/upload') {
          // dispatch({ type: 'fetch', payload: {...query}});
          console.log("进入图片上传功能演示");
        }
      });
    }
  },
  effects: {

  },
  reducers: {

  }
};
