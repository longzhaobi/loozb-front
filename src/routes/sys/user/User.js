import React, {PropTypes} from 'react';
import {connect} from 'dva';

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
      <UserList {...userListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    user:state.user
  };
}

export default connect(mapStateToProps)(User);
