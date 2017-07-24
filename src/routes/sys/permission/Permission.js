import React, {PropTypes} from 'react';
import {connect} from 'dva';
import PermissionList from './component/PermissionList';
import WithRule from '../../../hocs/WithRule'
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

export default connect(mapStateToProps)(WithRule('permission:view')(Permission));
