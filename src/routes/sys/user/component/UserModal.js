import React, { PropTypes } from 'react';
import { Form, Input, Modal,Button,Radio,message,Checkbox,Icon, Row, Col} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const UserModal = ({visible, type, form, item = {},onOk,onCancel,title,loading}) => {

  const { getFieldDecorator,validateFields } = form;
  function handleOk() {
    form.validateFields((errors) => {
      if (errors) {
        message.error('验证失败，请核验表单信息');
        return;
      }
      Modal.confirm({
        title: `确定${title}吗？`,
        onOk() {
          const data = { ...form.getFieldsValue()};
          onOk(data);
        },
        okText: '确定',
        cancelText: '取消',
      });
    });
  }

  const modalOpts = {
    title,
    visible,
    width:900,
    onOk: handleOk,
    onCancel,
    footer:[
      <Button key="back" type="ghost" size="large" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" size="large" onClick={handleOk}>
        确定
      </Button>
    ]
  };
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
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
                initialValue: item['username'] || ''
              })(
              <Input type="text" placeholder="请输入用户名" />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {getFieldDecorator('gender', { initialValue: item['gender'] || '1' })(
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
                initialValue: item['idcard'] || ''
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
                initialValue: item['phone'] || ''
              })(
                <Input type="text" placeholder="请输入联系电话" />
              )}
            </FormItem>
          </Col>

          <Col sm={12}>
            <FormItem
              {...formItemLayout}
              label="密码"
              help={type === 'update' ? '不输入密码则不会更新原始密码' : ''}
            >
              {getFieldDecorator('password', {
                rules: [
                  { min: 5, message: '密码不能小于5位' },
                  { max: 20, message: '密码不能超过20位' },
                  // { validator: this.userExists },
                ],
                initialValue: ''
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
                initialValue: item['email'] || ''
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
                initialValue: item['job'] || ''
              })(
                <Input type="text" placeholder="请输入工作职位" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

UserModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(UserModal);
