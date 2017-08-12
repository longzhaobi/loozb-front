import React, {PropTypes} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import cookie from 'js-cookie';
import {Row, Col, Alert} from 'antd';
import styles from './UIHome.css';
const Home = ({auth}) => {
  const user = {};
  const height=1450;
  const message = (
    <div>
    尊敬的省外招投标用户，由于您在我中心尚为对信息进行完善处理，您还不能在我中心进行招投标报名操作，如需进行招投标报名，
    请完善你们的企业信息  >> <Link to="/message/baseinfo">我要完善</Link>
    </div>
  )
  return (
    <div className={styles.normal}>
      <div className={styles.notice}>
        <label>重要公告：</label>
        <a href="http://www.gzsggzyjyzx.cn/content?cls=2&id=INF-20160000888" target="_blank">[11.04] 贵州省商务厅关于邀请参加公共资源拍卖学习班的函</a>
        <a href="http://www.gzsggzyjyzx.cn/content?cls=2&id=INF-20160000836" target="_blank">[10.14] 关于开展招、投标文件制作工具现场服务工作的通知</a>
        <a style={{marginLeft:40}}>更多 >></a>
      </div>
      <div className={styles.content} style={{height:height-80}}>
        <Alert message={message} type="warning"  showIcon closable/>
        <Row type="flex" gutter={15} justify="start">
          <Col span={19}>
            <div className={[styles.item]} style={{padding:20}}>
              <h2>欢迎您，{user == null ? "" : user.user_name}</h2>
            </div>
          </Col>
          <Col span={5}>
            <div className={[styles.item]}></div>
          </Col>
        </Row>
        <Row type="flex" gutter={15} justify="start" style={{marginTop:15}}>
          <Col span={19}>
            <Row type="flex" gutter={15} justify="start">
              <Col span={24}>
                <div className={[styles.item]}></div>
              </Col>
            </Row>
            <Row type="flex" gutter={15} justify="start" style={{marginTop:15}}>
              <Col span={24}>
                <div className={[styles.item]} style={{height:400}}></div>
              </Col>
            </Row>
          </Col>
          <Col span={5}>
            <div className={[styles.item]} style={{height:590}}></div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(Home);;
