import React, { PropTypes } from 'react';

import { Form, Input, Col, Button, Icon, Checkbox, message } from 'antd';

import styles from './LoginPage1.css';
const FormItem = Form.Item;

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'login'
    }
  }
  render() {

    const { dispatch, form, loading, namespace } = this.props;
    const { getFieldDecorator, validateFields } = form;

    function handleLogin(e) {
      e.preventDefault();
      //表单校验
      validateFields((errors, data) => {
        if (!!errors) {
          return;
        }
        dispatch({ type: `${namespace}/login`, payload: data })
      });
    }

    function handleRegister(e) {
      e.preventDefault();
      //表单校验
      validateFields((errors, data) => {
        if (!!errors) {
          return;
        }
        const {username, regPassword, confirmPassword} = data;
        if(regPassword != confirmPassword) {
          message.error('两次输入的密码不一致');
          return;
        }
        const params = {
          username,
          password: regPassword,
        }
        dispatch({ type: `${namespace}/register`, payload: params })
      });
    }
    return (
      <div className={styles.container}>
        <div className={styles.codropsTop}>
          <a href="https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md" target="_blank">
            <strong>&laquo; DVA </strong>官方教程
                </a>
          <span className={styles.right}>
            <a href="https://ant.design/docs/react/introduce-cn" target="_blank">
              <strong>访问Ant Design官方文档</strong>
            </a>
          </span>
          <div className={styles.clr}></div>
        </div>
        <header>
          <h1>基于React、Dva、Ant Design开发的一套权限管理系统</h1>

        </header>

        <section>
          <div className={styles.containerDemo} >
            <div className={styles.wrapper}>
              {
                this.state.current === 'login' ? <div className={styles.login}>
                <h1>登录</h1>
                <Form onSubmit={handleLogin} className="login-form">
                  <FormItem>
                    {getFieldDecorator('account', {
                      rules: [{ required: true, message: '请输入您的用户名' }],
                    })(
                      <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />
                      )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请填写您的密码!' }],
                    })(
                      <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请填写您的密码" />
                      )}
                  </FormItem>
                  <Button type="primary" size="large" style={{ width: '100%' }} htmlType="submit" loading={loading}>
                    登 录
                </Button>
                </Form>
                <p className={styles.changeLink}>
                  没有帐号 ?
									<a onClick={() => this.setState({ current: 'register' })}>注册</a>
                </p>
              </div> : null
              }
              {
                this.state.current === 'register' ? <div className={styles.register}>
                <h1>注册</h1>
                <Form onSubmit={handleRegister} className="login-form">
                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入您的用户名!' }, { min: 2, max: 20, message: '用户名长度必须为2到20个字符' }],
                    })(
                      <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                      )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('regPassword', {
                      rules: [{ required: true, message: '密码不能为空' }, { min: 6, max: 20, message: '密码长度必须为6到12个字符' }],
                    })(
                      <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入您的密码" />
                      )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('confirmPassword', {
                      rules: [{ required: true, message: '密码不能为空' }, { min: 6, max: 20, message: '密码长度必须为6到12个字符' }],
                    })(
                      <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请再次输入您的密码" />
                      )}
                  </FormItem>
                  <Button type="primary" size="large" style={{ width: '100%' }} htmlType="submit" loading={loading}>
                    注 册
                  </Button>
                </Form>
                <p className={styles.changeLink}>
                  已经注册 ?
									<a onClick={() => this.setState({ current: 'login' })}>登录</a>
                </p>
              </div> : null
              }
            </div>
          </div>
        </section>

      </div>
    )
  }
}

export default Form.create()(LoginPage);
