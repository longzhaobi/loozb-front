import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Home from './home/Home';
import Layout from '../components/layout/Layout';
import styles from './App.css';

function App (props) {

  const { children} = props
  return (
    <Layout props={props}>
        {children || <Home/>}
    </Layout>
  );
}

App.propTypes = {
};

function mapStateToProps({app}) {
  return {app};
}

export default connect(mapStateToProps)(App);
