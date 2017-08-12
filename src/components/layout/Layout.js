import React, {PropTypes} from 'react';
import styles from './Layout.css';
import Header from './Header';
import Menus from './Menu';
import classnames from 'classnames';
import Sidebar from './Sidebar';
import { Breadcrumb } from 'antd';
class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    //去后端请求获取用户信息
    // this.props.props.dispatch({type:'app/current'})
  }
  render() {
    const {props, children} = this.props
    const {location, dispatch, app, routes} = props
    const {menuStyle, menu, user, online} = app;
    const cls = classnames({
      [styles.main]:true,
      [styles.min]:menuStyle === 'min',
      [styles.max]:true
    });
    return (
      <div className={styles.normal}>
        <Header location={location} dispatch={dispatch} user = {user} menu={menu} routes={routes}/>
        <Menus menu={menu} online={online}/>
        <div className={styles.content}>
          {children}
        </div>
     </div>
    )
  }
}
export default Layout;
