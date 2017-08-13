import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule'
import styles from './index.css';

const Index = ({location, dispatch, children, errorInfo, loading}) => {

  const namespace = 'errorInfo';
  const ListProps = {
    ...errorInfo,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <List {...ListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.errorInfo,
    errorInfo:state.errorInfo
  };
}

export default connect(mapStateToProps)(WithRule('errorInfo:view')(Index));
