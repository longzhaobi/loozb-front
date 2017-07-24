import React, { Component } from 'react';
import { Form, Input, Modal, Button, Radio, message, Checkbox, Icon, Row, Col} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
    const { title, dispatch, namespace, option,record } = this.props;
    this.props.form.validateFields((err, params) => {
      if (!err) {
        Modal.confirm({
          title: `确定${title}吗？`,
          content: 'Bla bla ...',
          okText: '确定',
          cancelText: '取消',
          onOk:() => {
            const _self = this;
            dispatch({
              type: `${namespace}/${option}`,
              payload: {...params, id:record.id_},
              callback(data) {
                dispatch({ type: 'app/result',payload:{data, namespace}, onHander() {
                  _self.hideModelHandler();
                } });
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
          width={900}
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
            <Row gutter={16}>
              <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="用户名"
                >
                {getFieldDecorator('username', {
                  rules: [
                      { required: true, min: 5, message: '用户名不能小于5位' },
                      { max: 20, message: '用户名不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['username'] || ''
                  })(
                  <Input type="text" placeholder="请输入用户名" />
                )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="性别"
                >
                  {getFieldDecorator('gender', { initialValue: record['gender'] || '1' })(
                    <RadioGroup>
                      <Radio value="1">男</Radio>
                      <Radio value="2">女</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="身份证号"
                >
                  {getFieldDecorator('idcard', {
                    rules: [
                      { max: 20, message: '身份证不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['idcard'] || ''
                  })(
                    <Input type="text" placeholder="请输入身份证号码" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系电话"
                >
                  {getFieldDecorator('phone', {
                    rules: [
                      { min: 5, message: '联系电话不能小于7位' },
                      { max: 20, message: '联系电话不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['phone'] || ''
                  })(
                    <Input type="text" placeholder="请输入联系电话" />
                  )}
                </FormItem>
              </Col>

              <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="密码"
                >
                  {getFieldDecorator('password', {
                    rules: [
                      { min: 5, message: '密码不能小于5位' },
                      { max: 32, message: '密码不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['password'] || ''
                  })(
                    <Input type="password" placeholder="请输入密码" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="邮箱"
                >
                  {getFieldDecorator('email', {
                    rules: [
                      { min: 5, message: '邮箱不能小于5位' },
                      { max: 20, message: '邮箱不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['email'] || ''
                  })(
                    <Input type="email" placeholder="请输入邮箱" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="工作职位"
                >
                  {getFieldDecorator('job', {
                    rules: [
                      { min: 2, message: '工作职位不能小于5位' },
                      { max: 20, message: '工作职位不能超过20位' },
                      // { validator: this.userExists },
                    ],
                    initialValue: record['job'] || ''
                  })(
                    <Input type="text" placeholder="请输入工作职位" />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserModal);
