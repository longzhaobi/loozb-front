import React, { Component } from 'react';
import { Form, Input, Modal, Button, Radio, message, Checkbox, Icon, Row, Col} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class PasswordModel extends Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { title, dispatch } = this.props;
    const _self = this;
    this.props.form.validateFields((err, params) => {
      if (!err) {
        Modal.confirm({
          title: '系统提示',
          content: `确定${title}吗？`,
          okText: '确定',
          cancelText: '取消',
          onOk:() => {
            dispatch({
              type: 'app/updatePassword',
              payload: params,
              callback(data) {
                if(data) {
                  message.info("密码修改成功，下次登陆时请使用新密码登录");
                  _self.hideModelHandler();
                } else {
                  message.error("密码修改失败");
                }
              }
            })
          }
        });
      }
    });
  };

  render() {
    const { children, title, loading, record } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={title}
          visible={this.state.visible}
          width={560}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          footer={[
          <Button key="back" type="ghost" size="large" onClick={this.hideModelHandler}>取消</Button>,
          <Button key="submit" type="primary" size="large" disabled={loading} loading={loading} onClick={this.okHandler}>
            {loading ? '处理中...' : '确定'}
          </Button>,
        ]}
        >
          <Form layout='horizontal' onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="原密码"
            >
            {getFieldDecorator('oldPassword', {
              rules: [
                  { required: true, message: '原密码不能为空' }
                ],
              })(
              <Input type="password" placeholder="请输入原密码" />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
            >
            {getFieldDecorator('newPassword', {
              rules: [
                  { required: true,  message: '请输入新密码' },
                  { min: 6, max:16,  message: '密码长度只能为 6 到16 个字符' }
                ],
              })(
              <Input type="password" placeholder="请输入新密码" />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认新密码"
            >
              {getFieldDecorator('confirmPassword', {
                rules: [
                  { required: true,  message: '请输入新密码' },
                  { min: 6, max:16,  message: '密码长度只能为 6 到16 个字符' }
                ],
              })(
                <Input type="password" placeholder="请输入新密码" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PasswordModel);
