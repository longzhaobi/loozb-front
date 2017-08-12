import React, { Component } from 'react';
import { Form, Input, Modal, Button, InputNumber, Col, message, Icon, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class RoleModal extends Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      visible: false,
      permission: []
    };
  }

  showModelHandler = (e) => {
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    const { dispatch, namespace } = this.props;
    const _self = this;
    dispatch({
      type: `${namespace}/fetchPermission`, callback(data) {
        if (data) {
          _self.setState({
            visible: true,
            permission: data.data
          });
        }
      }
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { title, dispatch, namespace, option, record, item } = this.props;
    this.props.form.validateFields((err, params) => {
      if (!err) {
        Modal.confirm({
          title: `确定${title}吗？`,
          content: 'Bla bla ...',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            const _self = this;
            const formData = option === 'create' ? { ...params, hasPermission: params.hasPermission.join(","), pid: item.id_, pids: item.pids + item.id_ + '/' } : { ...params, hasPermission: params.hasPermission.join(",") };
            dispatch({
              type: `${namespace}/${option}`,
              payload: { ...formData, id: record.id_ },
              callback(data) {
                dispatch({
                  type: 'app/result', payload: { data, namespace }, onHander() {
                    _self.hideModelHandler();
                  }
                });
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

    const permissionOption = [];
    for (let i = 0; i < this.state.permission.length; i++) {
      permissionOption.push(<Option key={this.state.permission[i].id}>{this.state.permission[i].name}</Option>)
    }

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
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
              label="资源名称"
            >
              {getFieldDecorator('name', {
                rules: [
                  { required: true, max: 25, message: '资源名称不能为空，且不能超过25位字符' }
                ],
                initialValue: record['name'] || ''
              })(
                <Input type="text" placeholder="请输入资源名称" />
                )}
            </FormItem>
            <FormItem
              label="权重和类型"
              {...formItemLayout}
            >
              <Col span="12">
                <FormItem >
                  {getFieldDecorator('weight', {
                    initialValue: record['weight'] || 0
                  })(
                    <InputNumber min={1} />
                    )}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem>
                  {getFieldDecorator('menuType', {
                    initialValue: record['menuType'] || '3'
                  })(
                    <Select
                      placeholder="请选择资源权限"
                    >
                      <Option value="1">父子类型</Option>
                      <Option value="2">分组类型</Option>
                      <Option value="3">普通类型</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="资源标识"
            >
              {getFieldDecorator('identity', {
                rules: [
                  { required: true, max: 25, message: '资源名称不能为空，且不能超过25位字符' }
                ],
                initialValue: record['identity'] || ''
              })(
                <Input type="text" placeholder="请输入权限标识" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="资源图标"
            >
              {getFieldDecorator('icon', {
                rules: [
                  { max: 30, message: '资源图标不能超过25位字符' }
                ],
                initialValue: record['icon'] || ''
              })(
                <Input type="text" placeholder="请输入权限标识" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="资源链接"
            >
              {getFieldDecorator('url', {
                rules: [
                  { max: 200, message: '资源链接不能超过 200 位字符' }
                ],
                initialValue: record['url'] || ''
              })(
                <Input type="text" placeholder="请输入权限标识" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="资源权限"
            >
              {getFieldDecorator('hasPermission', {
                initialValue: record['hasPermission'] == null ? Array.of('1', '2', '3', '4') : record['hasPermission'].split(',') || []
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择需要的权限信息"
                >
                  {permissionOption}
                </Select>
                )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RoleModal);
