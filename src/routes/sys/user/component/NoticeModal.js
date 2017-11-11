import React, { Component } from 'react';
import { Form, Input, Modal, Button, message, Icon } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
class UserModal extends Component {

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
    const { title, dispatch, namespace, option, record } = this.props;
    this.props.form.validateFields((err, params) => {
      if (!err) {
        Modal.confirm({
          title: '系统提示',
          content: '确定发送通知吗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            dispatch({
              type: 'user/sendMessage',
              payload: params
            }).then((data) => {
              message.success('发送成功');
              this.hideModelHandler();
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
          {children}
        </span>
        <Modal
          title='通知'
          visible={this.state.visible}
          width={600}
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
            >
              {getFieldDecorator('message', {
                rules: [
                  { required: true, message: '必须输入' },
                  { max: 500, message: '不能超过500字符' }
                ],
                initialValue: ''
              })(
                <TextArea rows={4} placeholder="请输入您需要发送的信息" />
                )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserModal);
