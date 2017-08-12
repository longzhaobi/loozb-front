import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
import { Link } from 'dva/router';
import styles from './Menu.css';

class Menus extends React.Component {

  getMenus = data => data.map((item) => {
    if (item.children && item.children.length > 0) {
      if(item.menuType === '1') {
        return (
          <SubMenu key={item.identity} title={ <span><Icon type={item.icon} />{item.name}</span>}>
           
            {this.getMenus(item.children)}
          </SubMenu>
        );
      } else if(item.menuType === '2') {
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

    const {menu} = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.btnBar}>
          <Icon type='menu-fold' />
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['legal']}
          mode="inline"
          theme="dark" 
          className="loozb-menu-style"
        >
          {this.getMenus(menu)}
        </Menu>
      </div>
    );
  }
}

export default Menus;
