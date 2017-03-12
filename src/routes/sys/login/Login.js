import React from 'react';
import {connect} from 'dva';
import styles from './Login.css';

import LoginPage from './component/LoginPage';

const Login = ({location, dispatch, loading}) => {
  const namespace = 'app';
  const loginPageProps = {
    loading,
    namespace,
    dispatch
  }

  return (
    <div className={styles.normal}>
      <LoginPage {...loginPageProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global
  };
}
export default connect(mapStateToProps)(Login);
