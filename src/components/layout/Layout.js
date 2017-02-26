import React, {PropTypes} from 'react';
import styles from './Layout.css';
import Header from './Header';
import classnames from 'classnames';
import Sidebar from './Sidebar';
import { Breadcrumb } from 'antd';
const  Layout = ({props, children}) => {
  const {location, dispatch,routes, system} = props
  const {menuStyle, menu} = system;
  const cls = classnames({
    [styles.main]:true,
    [styles.min]:menuStyle === 'min',
    [styles.max]:menuStyle === 'max'
  });
  return (
    <div className={styles.normal}>
      <Header location={location} dispatch={dispatch} />
      <div className={styles.content}>
        <Sidebar location={location} dispatch = {dispatch} menuStyle={menuStyle} routes={routes} menu={menu}/>
        <div className={cls}>
            {children}
        </div>
      </div>

    </div>
  );
}

Layout.propTypes = {
  // children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

export default Layout;
