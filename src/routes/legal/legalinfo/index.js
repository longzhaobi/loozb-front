import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';

import FormPanel from './component/FormPanel';
import styles from './index.css';
const Message = (props) => {
  const {location, dispatch, children, route} = props;
  return (
    <div className={styles.normal}>
      <Breadcrumb {...props}/>
      <div className={styles.mainContent}>
        <FormPanel />
      </div>
    </div>
  )
}

function mapStateToProps({app}) {
  return {app};
}

export default connect(mapStateToProps)(Message);
