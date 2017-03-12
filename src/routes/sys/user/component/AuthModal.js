import React, { Component } from 'react';
import { Form, Modal,Button,message,Icon, Select, Alert} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class AuthModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      roles:[]
    };
  }


  showModelHandler = (e) => {
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    const _self = this;
    const {dispatch, namespace} = this.props;
    //显示之前去查询所有角色信息
    dispatch({
      type: `${namespace}/fetchRoles`,
      callback(response) {
        dispatch({ type: 'app/result',payload:{response, namespace}, onHander({data}) {
          _self.setState({
            visible: true,
            roles:data
          });
        } });
      }
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
      roles:[]
    });
  };

  okHandler = () => {
    const { record, form, namespace, dispatch } = this.props;
    form.validateFields((err, params) => {
      if (!err) {
        const rolesId = params.roles || [];
        Modal.confirm({
          title: `确定授权吗？`,
          content: `授权后，用户【${record.username}】将拥有选择的角色权限`,
          okText: '确定',
          cancelText: '取消',
          onOk:() => {
            const _self = this;
            dispatch({
              type: `${namespace}/auth`,
              payload: {id:record.id_, params},
              callback(response) {
                dispatch({ type: 'app/result',payload:{response, namespace}, onHander() {
                  message.success('授权成功！');
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
    const { children, record } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const rolesOption = [];
    for (let i = 0; i < this.state.roles.length; i++) {
      rolesOption.push(<Option key={this.state.roles[i].id}>{this.state.roles[i].name}</Option>);
    }
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title='用户授权'
          visible={this.state.visible}
          // width={900}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form  layout='horizontal'>
            <FormItem
              {...formItemLayout}
              label="授权用户"
            >
              <p className="ant-form-text" id="userName" name="userName">{record.username}</p>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色列表"
            >
              {getFieldDecorator('roles', {
                 initialValue: (record['roleIds'] == "" || record['roleIds'] == null) ? Array.of() : record['roleIds'].split(',') || []
               })(
                 <Select
                   multiple
                   placeholder="请选择角色信息"
                  //  defaultValue={['a10', 'c12']}
                  //  onChange={handleChange}
                 >
                   {rolesOption}
                 </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AuthModal);
