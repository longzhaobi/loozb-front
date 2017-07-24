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
    <div className={styles.login}>
      <Form className={styles.loginForm}  layout='horizontal' onSubmit={handleSubmit}>
        <h1 className={styles.title}>贵州交易见证系统平台</h1>
        <FormItem hasFeedback>
          {getFieldDecorator('account', {
              rules: [
                { required: true, min: 2, message: '账户名不能小于2个字符' }
              ]
          })(
              <Input type="text" prefix={<Icon type="user" style={{ fontSize: 13 }} />} className={styles.username} id="username" placeholder="用户名" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              { required: true, whitespace: true, message: '请填写密码' }
            ]
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} className={styles.password} id="password" type="password" placeholder="密码"/>
          )}
        </FormItem>
        <Button type="primary" style={{width:'100%',height:40}} htmlType="submit" size="large" loading={loading}>登录</Button>
      </Form>
    </div>
  )
}

export default Form.create()(LoginPage);
