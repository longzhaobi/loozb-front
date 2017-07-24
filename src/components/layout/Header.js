import React, { PropTypes, Component } from 'react';
import { Link,routerRedux } from 'dva/router';
import { Menu, Icon, Modal, Select, Dropdown, Button} from 'antd';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import PasswordModal from '../ui/PasswordModal';
import styles from './Header.css';

export default class Header extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.onSubBarClick = this.onSubBarClick.bind(this);
    this.state = {
      value:''
    };
  }

  componentWillMount() {
    const {routes} = this.props;
    if(routes && routes.length > 1 && routes[1].path) {
      let value = routes[1].path.substring(1)
      this.onSubBarClick(value);
    }
  }

  componentDidMount() {
    const {menu, dispatch, routes} = this.props;
    if(menu && menu.length > 0 && routes.length === 1) {
      this.onSubBarClick(menu[0].identity)
      dispatch(routerRedux.push({
        pathname: menu[0].url
      }));
    }
  }

  onSubBarClick(value) {
    this.setState({
      value
    })
  }

  render() {
    const { location,dispatch, user, menu } = this.props;
    function logout() {
      dispatch({
        type:'app/logout'
      });
    }

    function checkInfo() {

    }

    const subMenu = (
      <Menu>
        <Menu.Item key="0">
          <span><Icon type="book" onClick={checkInfo}/> 个人信息</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span onClick={logout}><Icon type="logout" /> 安全退出</span>
        </Menu.Item>
      </Menu>
    );

    const getMenu = data => data.map((item) => {
      return (
        <Link  onClick={() => this.onSubBarClick(item.identity)} key={item.identity} className = {this.state.value === item.identity ? styles.isCurrent : styles.noCurrent} to={item.url}>
          <span>{item.name}</span>
        </Link>
      )
    });

    return (
      <div className={styles.normal}>
        <div className={styles.leaft}>
          <a className={styles.logo}>ADMIN 系统基础权限系统</a>
          {getMenu(menu)}
        </div>
        <div className={styles.right}>
            <p style={{color:'#fff'}}>欢迎您！{user.name}</p> <span style={{width:'10px',color:'#fff'}}></span>
            <PasswordModal title="修改密码" dispatch={dispatch}>
                <a style={{color:'#fff'}}>修改密码</a>
            </PasswordModal> <span style={{width:'10px',color:'#fff'}}></span>
            <a style={{color:'#fff'}} onClick={logout}>安全退出</a>
        </div>
      </div>
    );
  }
}
