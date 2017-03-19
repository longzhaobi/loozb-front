import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import UIUpload from './component/UIUpload';

import styles from './Upload.css';

const Amap = (props) => {
  return (
    <div className={styles.root}>
      <Breadcrumb {...props}/>
      <UIUpload />
    </div>
  );
}

Amap.propTypes = {

}

export default Amap;
