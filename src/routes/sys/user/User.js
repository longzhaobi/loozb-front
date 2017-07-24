import React, { PropTypes } from 'react';
import { connect } from 'dva';
import UserList from './component/UserList';
import WithRule from '../../../hocs/WithRule'
import styles from './User.css';

const User = ({ location, dispatch, children, user, loading, namespace }) => {
  const userListProps = {
    ...user,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <UserList {...userListProps} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.user,
    user: state.user,
    namespace: 'user'
  };
}

export default connect(mapStateToProps)(WithRule('user:view')(User));
