import React, { Component } from 'react';
import { Form, Input, Modal, Button, Radio, message, Checkbox, Icon, Row, Col, Upload} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import styles from './ClassificationList.css'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}


class ClassificationModal extends Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      visible: false,
      imageUrl:null,
      uploading:false,
      url:null
    };
  }

  handleChange = (info) => {
    const { response, status } = info.file;
    if (status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      let url = '';
      if(response.data.error === 0) {
        url = response.data.url;
      }
      this.setState({
        uploading: false,
        url
      });
    } else if ( status === 'uploading') {
      if(!this.state.uploading) {
        this.setState({
          uploading: true
        });
      }
    }
  }

  showModelHandler = (e) => {
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    this.setState({
      visible: true
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
              payload: {...params, id:record.id_, url:_self.state.url},
              callback(response) {
                dispatch({ type: 'app/result',payload:{response, namespace}, onHander() {
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
    const url = this.state.url;
    const { children, title, loading, record } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const status = loading || this.state.uploading;
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
          <Button key="submit" type="primary" size="large" disabled={status} loading={status} onClick={this.okHandler}>
            { status ? '处理中...' : '确定'}
          </Button>,
        ]}
        >
          <Form layout='horizontal' onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="分类名称"
            >
            {getFieldDecorator('name', {
              rules: [
                 { required: true, max: 25, message: '分类名称不能超过25位字符' }
               ],
               initialValue: record['name'] || ''
             })(
              <Input type="text" placeholder="请输入分类名称" />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="分类描述"
              help="分类描述，可以为空"
            >
              {getFieldDecorator('description', {
                rules: [
                   { max: 200, message: '分类名称不能超过200位字符' }
                 ],
                 initialValue: record['description'] || ''
               })(
                <Input type="textarea" placeholder="请输入分类描述" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="分类图像"
            >
              <Upload
                className={styles.avatarUploader}
                name="uploadFile"
                showUploadList={false}
                action="/api/upload/images"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {
                  url ?
                    <img src={url} alt="" className={styles.avatar} /> :
                    <Icon type="plus" className={styles.avatarUploaderTrigger} />
                }
              </Upload>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ClassificationModal);
