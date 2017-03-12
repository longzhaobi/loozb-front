import React, { PropTypes } from 'react';
import { Menu, Icon, Modal} from 'antd';
import { Link } from 'dva/router';
import styles from './Header.css';
import { Select } from 'antd';
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Header({ location,dispatch }) {
  let user = localStorage.getItem('current_user');
  function logout() {
    Modal.confirm({
      title: '确定退出吗？',
      onOk() {
        dispatch({
          type:'auth/logout'
        });
      },
      okText: '确定',
      cancelText: '取消',
    });
  }
  function handleChange(value) {
    dispatch({
      type:'system/changeDataSource',
      payload:value
    })
  }
  return (
    <div className={styles.normal}>
      <div className={styles.leaft}>
        <a className={styles.logo}>LOOZB 后台管理系统</a>
        <a className={styles.item}>数据控制台</a>
      </div>
      <div className={styles.right}>
        <a onClick={logout} className={styles.logout}><Icon style={{marginTop:17}} type="user" />欢迎您-{user == null ? "" : JSON.parse(user).username}</a>
      </div>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
