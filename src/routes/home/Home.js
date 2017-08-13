import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import data from './data.json'
import UIHome from './component/UIHome';

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
      <div className={styles.notice}>
        <label>重要公告：</label>
        <a href="http://www.gzsggzyjyzx.cn/content?cls=2&id=INF-20160000888" target="_blank">[11.04] 贵州省商务厅关于邀请参加公共资源拍卖学习班的函</a>
        <a href="http://www.gzsggzyjyzx.cn/content?cls=2&id=INF-20160000836" target="_blank">[10.14] 关于开展招、投标文件制作工具现场服务工作的通知</a>
        <a style={{ marginLeft: 40 }}>更多 >></a>
      </div>
      <div className={styles.homeContent}>
        <UIHome />
      </div>

    </div>
  );

}

Home.propTypes = {

}

export default Home;
