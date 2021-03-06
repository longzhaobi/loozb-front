import React from 'react';
import { Router, Route } from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

export default function ({ history, app }) {
  const routes = [
    {
      path: '/',
      breadcrumbName: '首页',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/App'));
        });
      },
      childRoutes: [{
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
              registerModel(app, require('./routes/blog/article/model'));
              cb(null, require('./routes/blog/article'));
            });
          }
        },{
          breadcrumbName:"博文发布",
          path:"/blog/issue",
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/blog/issue/model'));
              cb(null, require('./routes/blog/issue'));
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
        breadcrumbName: "系统管理",
        path: "/sys",
        getComponent(nextState, cb) {
          require.ensure([], require => {
            cb(null, require('./routes/sys'));
          });
        },
        childRoutes: [
          {
            breadcrumbName: "用户列表",
            path: "/sys/user",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/user/model'));
                cb(null, require('./routes/sys/user'));
              });
            },
          }, {
            breadcrumbName: "角色列表",
            path: "/sys/role",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/role/model'));
                cb(null, require('./routes/sys/role'));
              });
            },
          }, {
            breadcrumbName: "权限列表",
            path: "/sys/permission",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/permission/model'));
                cb(null, require('./routes/sys/permission'));
              });
            },
          }, {
            breadcrumbName: "资源列表",
            path: "/sys/resource",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/resource/model'));
                cb(null, require('./routes/sys/resource'));
              });
            },
          }, {
            breadcrumbName: "系统日志",
            path: "/sys/event",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/event/model'));
                cb(null, require('./routes/sys/event'));
              });
            },
          }, {
            breadcrumbName: "会话管理",
            path: "/sys/session",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/session/model'));
                cb(null, require('./routes/sys/session'));
              });
            },
          }, {
            breadcrumbName: "数据字典",
            path: "/sys/dic",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/dic/model'));
                cb(null, require('./routes/sys/dic'));
              });
            },
          }, {
            breadcrumbName: "错误信息",
            path: "/sys/errorinfo",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/error/model'));
                cb(null, require('./routes/sys/error'));
              });
            },
          }, {
            breadcrumbName: "修改信息",
            path: "/sys/modifyinfo",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/modify/model'));
                cb(null, require('./routes/sys/modify'));
              });
            },
          }, {
            breadcrumbName: "缓存管理",
            path: "/sys/cache",
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./routes/sys/cache/model'));
                cb(null, require('./routes/sys/cache'));
              });
            },
          }
        ]
      }],
    },
    {
      path: '/login',
      breadcrumbName: "用户登录",
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          // registerModel(app, require('./models/users'));
          cb(null, require('./routes/sys/login/Login'));
        });
      }
    }
  ];

  return <Router history={history} routes={routes} />;
}
