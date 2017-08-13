import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import cookie from 'js-cookie';
import { Row, Col, Alert } from 'antd';
import styles from './UIHome.css';
const Home = ({ app }) => {
  const user = {};
  const message = (
    <div>
      尊敬的省外招投标用户，由于您在我中心尚为对信息进行完善处理，您还不能在我中心进行招投标报名操作，如需进行招投标报名，
    请完善你们的企业信息  >> <Link to="/legal/base">我要完善</Link>
    </div>
  )
  return (
    <div className={styles.content}>
      <Alert message={message} type="warning" showIcon closable />
      
    </div>
  );
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Home);;
