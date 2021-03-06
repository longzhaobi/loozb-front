import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule';
import styles from './index.css';

const Index = ({location, dispatch, children, permission, loading}) => {

  const namespace = 'permission';

  const ListProps = {
    ...permission,
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
    loading: state.loading.models.permission,
    permission:state.permission
  };
}

export default connect(mapStateToProps)(WithRule('permission:view')(Index));
