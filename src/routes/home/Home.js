import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import data from './data.json'
import UIHome from './component/UIHome';

// import Chat from '../../components/chat';

import styles from './Home.css';

const Home = (props) => {

  const state = {
    shape: 'spline',
    data: data.slice(0, data.length / 2 - 1),
    width: 1700,
    height: 550,
    plotCfg: {
      margin: [10, 100, 50, 120],
    },
  }

  return (
    <div className={styles.root}>
      {/* <Chat /> */}
    </div>
  );

}

Home.propTypes = {

}

export default Home;
