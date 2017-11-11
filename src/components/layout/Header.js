import React, { PropTypes, Component } from 'react';
import { Link, routerRedux } from 'dva/router';
import { Menu, Icon, Modal, Select, Dropdown, Button, Badge } from 'antd';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import PasswordModal from '../ui/PasswordModal';
import ChatModal from '../chat/ChatModal';
import styles from './Header.css';

export default class Header extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.onSubBarClick = this.onSubBarClick.bind(this);
    this.state = {
      value: ''
    };
  }

  onSubBarClick(value) {
    this.setState({
      value
    })
  }

  render() {
    const { location, dispatch, user, menu } = this.props;
    function logout() {
      dispatch({
        type: 'app/logout'
      });
    }

    function checkInfo() {

    }

    const subMenu = (
      <Menu>
        <Menu.Item key="0">
          <span><Icon type="book" onClick={checkInfo} /> 个人信息</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span onClick={logout}><Icon type="logout" /> 安全退出</span>
        </Menu.Item>
      </Menu>
    );

    const getMenu = data => data.map((item) => {
      return (
        <Link onClick={() => this.onSubBarClick(item.identity)} key={item.identity} className={this.state.value === item.identity ? styles.isCurrent : styles.noCurrent} to={item.url}>
          <span>{item.name}</span>
        </Link>
      )
    });

    return (
      <div className={styles.normal}>
        <div className={styles.leaft}>
          <a className={styles.logo}>ADMIN 系统基础权限系统</a>
        </div>
        <div className={styles.right}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{ background: '#0099CC' }}
          >
            {/* <Menu.Item key="app">
              <ChatModal dispatch={dispatch}>
                <Badge count={0} showZero style={{ marginLeft: 10 }}>
                  <Icon type="bell" />
                  聊天窗口
                </Badge>
              </ChatModal>
            </Menu.Item> */}
            <SubMenu title={<span><Icon type="user" />欢迎您！ {user.username}</span>}>
              <Menu.Item key="setting:1"><PasswordModal title="修改密码" dispatch={dispatch}>修改密码</PasswordModal></Menu.Item>
              <Menu.Item key="setting:2">意见反馈</Menu.Item>
              <Menu.Item key="setting:3"><span onClick={logout}>安全退出</span></Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}
