import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import UIAmap from './component/UIAmap';

import styles from './Amap.css';

const Amap = (props) => {
  return (
    <div className={styles.root}>
      <Breadcrumb {...props}/>
      <UIAmap />
    </div>
  );
}

Amap.propTypes = {

}

export default Amap;
