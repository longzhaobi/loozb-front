import {hashHistory, routerRedux} from 'dva/router';
import * as service from '../services/system';
import cookie from 'js-cookie';
export default {
  namespace: 'system',
  state: {
    subMenu:[],
    menu:[],
    menuStyle:'min'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const path = pathname.split('/')[1];
        //从本地获取菜单信息
        dispatch({type:'getMenu',payload:{identity:path,isRoot:pathname === '/' + path}})
      });
    }
  },
  effects: {
    *login({ payload }, { put, select, call }) {
      const response = yield call(service.login, payload);
      if(response) {
        const {data} = response;
        if(data && data.httpCode === 200) {
          const o = data.data;
          //设置权限信息到本地
          localStorage.setItem('has_permissions', o.hasPermissions);
          //设置角色信息到本地
          localStorage.setItem('has_roles', o.hasRoles);
          //设置菜单信息到本地
          localStorage.setItem('has_menus', JSON.stringify(o.hasMenus));
          //设置用户信息到本地
          localStorage.setItem('current_user', JSON.stringify(o.sysUser));
          //保存token
          // localStorage.setItem('access_token', o.token);
          cookie.set('access_token', o.token, {expires: 7});
          console.log(localStorage.getItem("access_token"));
          yield put(routerRedux.push('/'));
        }
      }
    },
    *getMenu({payload}, {put, select, call}) {
      const menus = localStorage.getItem('has_menus');
      if(menus) {
        const hasMenus = JSON.parse(menus);
        const {identity} = payload;
        yield put({type:'queryMenuSuccess',payload:hasMenus});
        if(hasMenus && hasMenus.length > 0) {
          for (let menu of hasMenus) {
            if(menu.identity === identity) {
              const subMenu = menu.children;
              if(subMenu && subMenu.length > 0) {
                if(menu.identity === payload.identity) {
                  yield put({
                    type:'querySubMenuSuccess',
                    payload:subMenu.sort((a, b) => a.weight - b.weight)
                  });
                  // if(payload.isRoot) {
                  //   if(subMenu[0].children.length > 0) {
                  //     //假如还有孩子
                  //     yield put(routerRedux.push(subMenu[0].children[0].url));
                  //   } else {
                  //     yield put(routerRedux.push(subMenu[0].url));
                  //   }
                  // }
                }
              }
            }
          }
        }
      }
    }
  },
  reducers: {
    queryMenuSuccess(state, action) {
      return {...state, menu:action.payload};
    },
    querySubMenuSuccess(state, action) {
      return {...state, subMenu:action.payload};
    }
  }
};
