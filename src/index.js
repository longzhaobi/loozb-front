import dva from 'dva';
// import { browserHistory } from 'dva/router';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.css';

import isAuth from './utils/auth';
window.isAuth = isAuth;
window.table_height = document.documentElement.clientHeight - 228;

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
