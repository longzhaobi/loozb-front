import React, { Component } from 'react';
import { Form, Input, Modal, Button, Radio, message, Checkbox, Icon, Row, Col} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class RoleModal extends Component {

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
          title: '系统提示',
          content: `确定${title}吗？`,
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
          width={560}
          maskClosable={false}
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
              label="名称"
            >
            {getFieldDecorator('name', {
              rules: [
                  { required: true, max: 25, message: '名称不能大于 25 个字符' }
                ],
                initialValue: record['name'] || ''
              })(
              <Input type="text" placeholder="请输入角色名称" />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="编码"
            >
            {getFieldDecorator('code', {
              rules: [
                  { required: true, max: 25, message: '标识不能为空且不能小于 25 个字符' }
                ],
                initialValue: record['code'] || ''
              })(
              <Input type="text" placeholder="请输入角色名称" />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="值"
            >
              {getFieldDecorator('value', {
                rules: [
                  { required: true, max: 100, message: '角色描述不能超过 100 个字符' },
                ],
                initialValue: record['value'] || ''
              })(
                <Input type="text" placeholder="请输入值" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RoleModal);
