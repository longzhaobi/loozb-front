import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import MenuBar from '../../components/layout/MenuBar';
import styles from './index.css';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
      panes: [],
    };
  }

  render() {
    const { location, dispatch, children, routes, app } = this.props;
    const route = routes[routes.length - 1]
    return (
      <div className={styles.normal}>
        {children}
      </div>
    )
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Index);
