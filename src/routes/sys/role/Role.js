import React, {PropTypes} from 'react';
import {connect} from 'dva';
import MsgTip from '../../../components/ui/MsgTip';
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
      <MsgTip />
      <RoleList {...roleListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.role,
    role:state.role
  };
}

export default connect(mapStateToProps)(Role);
