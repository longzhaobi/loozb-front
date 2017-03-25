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
        path: '/amap',
        breadcrumbName:"高德地图功能演示",
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('./routes/amap/model/amap'));
            cb(null, require('./routes/amap/Amap'));
          });
        },
      },{
        path: '/upload',
        breadcrumbName:"附件上传",
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('./routes/upload/model/upload'));
            cb(null, require('./routes/upload/Upload'));
          });
        },
      },{
        breadcrumbName:"博客管理",
        path:"/blog",
        getComponent(nextState, cb) {
          require.ensure([], require => {
            cb(null, require('./routes/blog/Blog'));
          });
        },
        childRoutes:[{
          breadcrumbName:"博文列表",
          path:"/blog/article",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/blog/article/model/article'));
              cb(null, require('./routes/blog/article/Article'));
            });
          }
        },{
          breadcrumbName:"博文发布",
          path:"/blog/issue",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/blog/issue/model/issue'));
              cb(null, require('./routes/blog/issue/Issue'));
            });
          }
        },{
          breadcrumbName:"博文类型",
          path:"/blog/classification",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/blog/classification/model/classification'));
              cb(null, require('./routes/blog/classification/Classification'));
            });
          }
        },{
          breadcrumbName:"博文编辑",
          path:"/blog/edit",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/blog/edit/model/edit'));
              cb(null, require('./routes/blog/edit/Edit'));
            });
          }
        }]
      },{
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
    }
  ];

  return <Router history={history} routes={routes} />;
}
