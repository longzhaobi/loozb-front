import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule'
import styles from './index.css';

const Index = ({location, dispatch, children, role, loading}) => {

  const namespace = 'role';

  const ListProps = {
    ...role,
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
    loading: state.loading.models.role,
    role:state.role
  };
}

export default connect(mapStateToProps)(WithRule('role:view')(Index));
