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
    const { dispatch, namespace } = this.props;
    this.props.form.validateFields((err, params) => {
      if (!err) {
        Modal.confirm({
          title: `系统提示`,
          content: '确定清除缓存吗？',
          okText: '确定',
          cancelText: '取消',
          onOk:() => {
            const _self = this;
            dispatch({
              type: `${namespace}/removeCache`,
              payload: params.cacheKey,
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
    const { children, loading } = this.props;
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
          title='缓存清理'
          visible={this.state.visible}
          width={560}
          maskClosable={false}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          footer={[
          <Button key="back" type="ghost" size="large" onClick={this.hideModelHandler}>取消</Button>,
          <Button key="submit" type="primary" size="large" disabled={loading} loading={loading} onClick={this.okHandler}>
            {loading ? '处理中...' : '清除缓存'}
          </Button>,
        ]}
        >
          <Form layout='horizontal' onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="缓存KEY"
            >
            {getFieldDecorator('cacheKey', {
              rules: [
                 { required: true, message: '缓存KEY必须输入' }
               ],
               initialValue: 'LOOZB:'
             })(
              <Input type="text" placeholder="请输入缓存KEY" />
            )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RoleModal);
