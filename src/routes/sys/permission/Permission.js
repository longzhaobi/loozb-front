import React, {PropTypes} from 'react';
import {connect} from 'dva';
import MsgTip from '../../../components/ui/MsgTip';
import PermissionList from './component/PermissionList';

import styles from './Permission.css';

const Permission = ({location, dispatch, children, permission, loading}) => {

  const namespace = 'permission';

  const permissionListProps = {
    ...permission,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <MsgTip />
      <PermissionList {...permissionListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.permission,
    permission:state.permission
  };
}

export default connect(mapStateToProps)(Permission);
