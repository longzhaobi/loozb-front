import React, {PropTypes} from 'react';
import {connect} from 'dva';
import MsgTip from '../../../components/ui/MsgTip';
import UserList from './component/UserList';

import styles from './User.css';

const User = ({location, dispatch, children, user, loading}) => {

  const namespace = 'user';

  const userListProps = {
    ...user,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <MsgTip />
      <UserList {...userListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.user,
    user:state.user
  };
}

export default connect(mapStateToProps)(User);
