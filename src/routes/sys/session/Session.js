import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule'
import styles from './Session.css';

const Session = ({location, dispatch, children, session, loading, user}) => {

  const namespace = 'session';
  const listProps = {
    ...session,
    dispatch,
    loading,
    namespace,
    user
  }

  return (
    <div className={styles.root}>
      <List {...listProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.session,
    session: state.session,
    user: state.app.user
  };
}

export default connect(mapStateToProps)(WithRule('session:view')(Session));
