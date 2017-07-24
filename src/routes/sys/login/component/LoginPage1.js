import React, {PropTypes} from 'react';

import { Form, Input, DatePicker, Col,Button, Icon } from 'antd';

import styles from './LoginPage.css';
const FormItem = Form.Item;

const LoginPage = ({dispatch,form, loading, namespace}) => {
  const { getFieldDecorator, validateFields } = form;

  function handleSubmit(e) {
    e.preventDefault();
    //表单校验
    validateFields((errors, data) => {
      if (!!errors) {
        return;
      }
      dispatch({type:`${namespace}/login`,payload:data})
    });
  }
  return (
    <div className={styles.loginPanel}>
      <div className={styles.loginForm}>
        <div className={styles.main}>
          <div className={styles.logo}>
            <div className={styles.logoimg}><img alt="" src={require('../../../../assets/wuhan_logo.png')}/></div>
            <h1>武汉数字禁毒应用平台</h1>
            <p className={styles.version}>Wuhan Shu Zi Jin Du</p>
          </div>
          <div className={styles.img1}>
            <img alt="" src={require('../../../../assets/hhl_img.png')}/>
          </div>
          <div className={styles.login}>
            <div className="sj sj1"></div>
            <div className="sj sj2"></div>
            <div className="sj sj3"></div>
            <div className="sj sj4"></div>
            <div className="text">用户登录</div>
            <div className="btn_group">
              <a href="javascript:void(0)" className="modify" id="modifyPwd" >帮&nbsp;&nbsp;&nbsp;&nbsp;助</a>
              <a href="javascript:void(0)" className="download">插件下载</a>
            </div>
          </div>
          </div>
        </div>
      <div className={styles.bar}></div>
      <p className={styles.footer}>技术支持：贵州海誉科技股份有限公司</p>
    </div>
  )
}

export default Form.create()(LoginPage);
