import React, { PropTypes, Component } from 'react';
import { Menu, Icon } from 'antd';
import {routerRedux} from 'dva/router';
import { Link } from 'dva/router';
const SubMenu = Menu.SubMenu;
import request from '../../utils/request';
const MenuItemGroup = Menu.ItemGroup;
import classnames from 'classnames';
import styles from './MenuBar.css';

const MenuBar = ({location,name, subMenu, menuStyle}) => {
  const menus = data => data.map((item) => {
    if (item.children && item.children.length > 0) {
      if(item.menuType === '1') {
        return (
          <SubMenu key={item.identity} title={item.name}>
            {menus(item.children)}
          </SubMenu>
        );
      } else if(item.menuType === '2') {
        //分组
        return (
          <MenuItemGroup key={item.identity} title={item.name}>
            {menus(item.children)}
          </MenuItemGroup>
        );
      }

    }
    return <Menu.Item key={item.identity}><Link to={item.url} className="menu-normal" activeClassName="menu-active">{item.name}</Link></Menu.Item>
  });

  const cls = classnames({
    [styles.normal]:true,
    [styles.min]:menuStyle === 'min',
    [styles.max]:menuStyle === 'max'
  });

  function getCurrentUrl(pathname) {
    return pathname.substring(pathname.lastIndexOf('/') + 1);
  }

  return (
    <div className={cls} style={{height:table_height+142}}>
      <div className={styles.menuName}>{name}</div>
      <Menu
          selectedKeys={[getCurrentUrl(location.pathname)]}
          defaultOpenKeys={['sys','ce']}
          mode="inline" className="hlht-menu-style" style={{backgroundColor:'rgb(234,237,241)'}}
        >
          {menus(subMenu)}
        </Menu>
    </div>
  )
}

export default MenuBar;
