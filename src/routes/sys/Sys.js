import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import MenuBar from '../../components/layout/MenuBar';
import styles from './Sys.css';
const Sys = (props) => {
  const {location, dispatch, children, route, system} = props;
  const {subMenu, menuStyle} = system;
  return (
    <div className={styles.normal}>
      <Breadcrumb {...props}/>
      <MenuBar location={location} name={route.breadcrumbName} menuStyle={menuStyle} subMenu={subMenu}/>
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  )
}

function mapStateToProps({system}) {
  return {system};
}

export default connect(mapStateToProps)(Sys);
