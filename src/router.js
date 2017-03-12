import React from 'react';
import { Router, Route } from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

export default function({ history, app }) {
  const routes = [
    {
      path: '/',
      breadcrumbName: '首页',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/App'));
        });
      },
      childRoutes:[{
        breadcrumbName:"系统管理",
        path:"/sys",
        getComponent(nextState, cb) {
          require.ensure([], require => {
            // app.model(require('./models/app'));
            cb(null, require('./routes/sys/Sys'));
          });
        },
        childRoutes:[{
          breadcrumbName:"用户列表",
          path:"/sys/user",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/sys/user/model/user'));
              cb(null, require('./routes/sys/user/User'));
            });
          },
        },{
          breadcrumbName:"角色列表",
          path:"/sys/role",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/sys/role/model/role'));
              cb(null, require('./routes/sys/role/Role'));
            });
          },
        },{
          breadcrumbName:"权限列表",
          path:"/sys/permission",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/sys/permission/model/permission'));
              cb(null, require('./routes/sys/permission/Permission'));
            });
          },
        },{
          breadcrumbName:"资源列表",
          path:"/sys/resource",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/sys/resource/model/resource'));
              cb(null, require('./routes/sys/resource/Resource'));
            });
          },
        },{
          breadcrumbName:"数据字典列表",
          path:"/sys/table",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/sys/table/model/table'));
              cb(null, require('./routes/sys/table/Table'));
            });
          },
        }]
      }]
    },
    {
      path: '/login',
      breadcrumbName:"用户登录",
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          // registerModel(app, require('./models/users'));
          cb(null, require('./routes/sys/login/Login'));
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
}
