import React from 'react';
import { connect } from 'dva';

import LoginPage from './component/LoginPage1';

const Login = ({ location, dispatch, loading }) => {
  const namespace = 'app';
  const loginPageProps = {
    loading,
    namespace,
    dispatch
  }

  return (
    <LoginPage {...loginPageProps} />
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global
  };
}
export default connect(mapStateToProps)(Login);
