import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Alert } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Home from './home/Home';
import Layout from '../components/layout';
import styles from './App.css';
import TabController from '../components/ui/TabController';
import WithInit from '../hocs/WithInit';
const isTab = false;
function App (props) {

  const { children, routes} = props
  const route = routes[routes.length - 1]
  return (
    <Layout props={props}>
        {!isTab && <Breadcrumb routes={routes}/>}
        {children != null ? isTab ? <TabController children={children} title={route.breadcrumbName} keys = {route.path}/> : children : <Home/>}
    </Layout>
  );
}

App.propTypes = {
};

function mapStateToProps({app}) {
  return {app};
}

export default connect(mapStateToProps)(WithInit(App));
