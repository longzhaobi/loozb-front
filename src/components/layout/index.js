import React, { PropTypes } from 'react';
import styles from './index.css';
import Header from './Header';
import Menus from './Menu';
import classnames from 'classnames';
import { Alert } from 'antd';
class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { props, children } = this.props
    const { location, dispatch, app, routes } = props
    const { menu, user, online, menuStyle } = app;
    const csl = classnames({
      [styles.content]: true,
      [styles.max]: menuStyle === 'max',
      [styles.min]: menuStyle === 'min'
    })
    return (
      <div className={styles.normal}>
        <Header location={location} dispatch={dispatch} user={user} menu={menu} routes={routes} />
        <Menus menu={menu} online={online} menuStyle={menuStyle} dispatch={dispatch}/>
        <div className={csl}>
          {children}
        </div>
      </div>
    )
  }
}
export default Layout;
