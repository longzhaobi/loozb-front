import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import MenuBar from '../../components/layout/MenuBar';
import styles from './index.css';
const Index = (props) => {
  const {location, dispatch, children, route, app} = props;
  const {subMenu, menuStyle} = app;
  return (
    <div className={styles.normal}>
      <Breadcrumb {...props}/>
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  )
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Index);