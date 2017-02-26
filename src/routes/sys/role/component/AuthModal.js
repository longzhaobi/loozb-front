import React, { PropTypes } from 'react';
import { Form, Modal,Button,message,Icon, Select, Alert} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const AuthModal = ({visible, item = {}, roles, onOk, onCancel, form}) => {
  const { getFieldDecorator,validateFields } = form;
  function handleOk() {
    Modal.confirm({
      title: `确定对用户 ${item.username} 授权吗？`,
      onOk() {
        const formData = { userId:item.id, roleIds:form.getFieldValue('roles').join()};
        onOk(formData);
      },
      okText: '确定',
      cancelText: '取消'
    });
  }
  const children = [];
  for (let i = 0; i < roles.length; i++) {
    children.push(<Option key={roles[i].id}>{roles[i].name}</Option>);
  }
  const modalOpts = {
    title:'用户授权',
    visible,
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
      <div>
        <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="授权用户"
        >
          <p className="ant-form-text" id="userName" name="userName">{item.username}</p>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="角色列表"
        >
          {getFieldDecorator('roles', {
             initialValue: (item['roleIds'] == "" || item['roleIds'] == null) ? Array.of() : item['roleIds'].split(',') || []
           })(
             <Select
               multiple
               placeholder="请选择角色信息"
              //  defaultValue={['a10', 'c12']}
              //  onChange={handleChange}
             >
               {children}
             </Select>
          )}
        </FormItem>
        </Form>
      </div>
    </Modal>
  );
}

AuthModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(AuthModal);
