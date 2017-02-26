import React, {PropTypes} from 'react';
import {connect} from 'dva';

import RoleList from './component/RoleList';

import styles from './Role.css';

const Role = ({location, dispatch, children, role, loading}) => {

  const namespace = 'role';

  const roleListProps = {
    ...role,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <RoleList {...roleListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    role:state.role
  };
}

export default connect(mapStateToProps)(Role);
