import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import MenuBar from '../../components/layout/MenuBar';
import styles from './Blog.css';
const Blog = (props) => {
  const {location, dispatch, children, route, app} = props;
  const {subMenu, menuStyle} = app;
  return (
    <div className={styles.normal}>
      {children}
    </div>
  )
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Blog);
