import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import {Icon} from 'antd';
import styles from './MsgTip.css';

/**
* 删除提示框
*/
const MsgTip = ({location, dispatch, children, app}) => {

  const { msg } = app;
  return (
    msg ? <div className={styles.normal}>
      <div className={styles.showBg}></div>
      <div className={styles.showModal}><Icon type="loading" /> {msg}</div>
    </div> : <div></div>
  )
}

function mapStateToProps ({app}) {
  return {app};
}

export default connect(mapStateToProps)(MsgTip);
