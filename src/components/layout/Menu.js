import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
import { Link } from 'dva/router';
import styles from './Menu.css';

import classnames from 'classnames';

class Menus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }

  toggleCollapsed = () => {
    const {dispatch, menuStyle } = this.props;
    dispatch({type:'app/switchClick', payload: menuStyle === 'max' ? 'min' : 'max'})
  }

  getMenus = data => data.map((item) => {
    if (item.children && item.children.length > 0) {
      if (item.menuType === '1') {
        return (
          <SubMenu key={item.identity} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>

            {this.getMenus(item.children)}
          </SubMenu>
        );
      } else if (item.menuType === '2') {
        //分组
        return (
          <MenuItemGroup key={item.identity} title={item.name}>
            {this.getMenus(item.children)}
          </MenuItemGroup>
        );
      }

    }
    return <Menu.Item key={item.identity}><Link to={item.url} className="menu-normal" activeClassName="menu-active">{item.name}</Link></Menu.Item>
  });
  render() {

    const { menu, menuStyle } = this.props;

    const cls = classnames({
      [styles.normal]: true,
      [styles.max]: menuStyle === 'max',
      [styles.min]: menuStyle === 'min'
    });
    return (
      <div className={cls}>
        <div className={styles.btnBar} onClick={this.toggleCollapsed}>
          <Icon type={menuStyle === 'max' ? 'menu-fold' : 'menu-unfold'} />
        </div>
        <Menu
          defaultOpenKeys={['blog']}
          mode="inline"
          theme="dark"
          className="loozb-menu-style"
          inlineCollapsed={menuStyle === 'max' ? false : true}
        >
          {this.getMenus(menu)}
        </Menu>
      </div>
    );
  }
}

export default Menus;
