import React, { PropTypes } from 'react';
import { connect } from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule'
import styles from './index.css';

const Index = ({ location, dispatch, children, user, loading, namespace }) => {
  const ListProps = {
    ...user,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <List {...ListProps} />
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

export default connect(mapStateToProps)(WithRule('user:view')(Index));
