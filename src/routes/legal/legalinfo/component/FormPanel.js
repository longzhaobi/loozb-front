import React, { PropTypes } from 'react';
import { Select, Radio, Input, Form, Icon, Button, Row, Col, Alert, Upload, DatePicker, InputNumber } from 'antd';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const createForm = Form.create;
const FormItem = Form.Item;
import styles from './FormPanel.css';

const BaseInfoForm = ({ form, user={} }) => {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  };

  const uploadProps = {
    action: '/upload.do',
    listType: 'picture-card',
    // defaultFileList: [{
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    //   thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    // }]
  }

  return (
    <div className={styles.normal}>

      <Form layout="horizontal">
        <div className={styles.title}>基本信息</div>
        <Alert message="如已三证合一，组织机构编码请输入18位社会统一诚信代码" type="warning" showIcon />
        <Row style={{ marginTop: 15 }}>
          <Col sm={8}>
            <FormItem
              {...formItemLayout}
              label="组织机构编码"
            >
              {getFieldDecorator('organ_no', {
                rules: [
                  { required: true, length: 18, message: '组织机构编码只能为18位' }
                  // { validator: this.userExists },
                ],
                initialValue: user.org_no || ''
              })(
                <Input type="text" placeholder="请输入组织机构编码" />
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="法定代表人"
            >
              {getFieldDecorator('organ_name', {
                rules: [
                  { required: true, message: '组织机构名称必须输入' }
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入法定代表人" />
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="注册负责人"
            >
              {getFieldDecorator('organ_name', {
                rules: [
                  { required: true, message: '组织机构名称必须输入' }
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入注册负责人" />
                )}
            </FormItem>
            <FormItem
              label="注册资本"
              {...formItemLayout}
            >
              {getFieldDecorator('inputNumber', { initialValue: 3 })(
                <InputNumber min={1} max={9999999} style={{ width: 100 }} />
              )}
              <span className="ant-form-text"> 万元</span>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="电子邮箱"
            >
              {getFieldDecorator('organ_name', {
                rules: [
                  { required: true, message: '组织机构名称必须输入' }
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入电子邮箱" />
                )}
            </FormItem>
          </Col>
          <Col sm={16} >
            <Row>
              <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 17 }}
                  label="组织机构名称"
                >
                  {getFieldDecorator('organ_name', {
                    rules: [
                      { required: true, message: '组织机构名称必须输入' }
                    ],
                    initialValue: user.user_name || ''
                  })(
                    <Input type="text" placeholder="请输入组织机构名称" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="单位性质"
                >
                  {getFieldDecorator('organ_name', {
                    rules: [
                      { required: true, message: '组织机构名称必须输入' }
                    ],
                    initialValue: ''
                  })(
                    <Select size="large" placeholder="请选择单位性质" style={{ width: 200 }}>
                      <Option value="jack">企业</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="行业代码"
                >
                  {getFieldDecorator('organ_names', {
                    rules: [
                      { required: true, message: '组织机构名称必须输入' }
                    ],
                    initialValue: ''
                  })(
                    <Select size="large" placeholder="请输入行业代码" style={{ width: 200 }}>
                      <Option value="jack">电气机械和器材制造业</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系电话"
                >
                  {getFieldDecorator('organ_name', {
                    rules: [
                      { required: true, message: '组织机构名称必须输入' }
                    ],
                    initialValue: ''
                  })(
                    <Input type="text" placeholder="请输入联系电话" />
                    )}
                </FormItem>
                <Row>
                  <Col sm={24}>
                    <FormItem
                      {...formItemLayout}
                      labelCol={{ span: 7 }}
                      wrapperCol={{ span: 17 }}
                      label="联系地址"
                    >
                      {getFieldDecorator('organ_name', {
                        rules: [
                          { required: true, message: '组织机构名称必须输入' }
                        ],
                        initialValue: ''
                      })(
                        <Input type="text" placeholder="请输入联系地址" />
                        )}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label="行政区域代码"
                >
                  {getFieldDecorator('organ_name', {
                    rules: [
                      { required: true, message: '组织机构名称必须输入' }
                    ],
                    initialValue: ''
                  })(
                    <Input type="text" placeholder="请输入行政区域代码" />
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="资信等级"
                >
                  {getFieldDecorator('organ_name', {
                    rules: [
                      { required: true, message: '组织机构名称必须输入' }
                    ],
                    initialValue: ''
                  })(
                    <Input type="text" placeholder="请输入资信等级" />
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="邮政编码"
                >
                  {getFieldDecorator('organ_name', {
                    rules: [
                      { required: true, message: '组织机构名称必须输入' }
                    ],
                    initialValue: ''
                  })(
                    <Input type="text" placeholder="请输入邮政编码" />
                    )}
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className={styles.title}>银行账户基本信息</div>
        <Alert message="银行要求，请正确填写，否则将导致银行退款（如退还保证金）不成功！" type="warning" showIcon />
        <Row style={{ marginTop: 15 }}>
          <Col sm={10}>
            <FormItem
              {...formItemLayout}
              label="开户银行"
            >
              {getFieldDecorator('organ_no', {
                rules: [
                  { required: true, length: 18, message: '组织机构编码只能为18位' }
                  // { validator: this.userExists },
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入用户名" />
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="账户名称"
            >
              {getFieldDecorator('organ_name', {
                rules: [
                  { required: true, message: '组织机构名称必须输入' }
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入工作职位" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上传开户许可证"
            >
              <Upload {...uploadProps}>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </Upload>
            </FormItem>
          </Col>
          <Col sm={14} >
            <FormItem
              {...formItemLayout}
              label="支行号"
            >
              {getFieldDecorator('organ_name', {
                rules: [
                  { required: true, message: '组织机构名称必须输入' }
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入工作职位" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="基本账户账号"
            >
              {getFieldDecorator('organ_name', {
                rules: [
                  { required: true, message: '组织机构名称必须输入' }
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入工作职位" />
                )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.title}>三证信息</div>
        <Alert message="若证书为“长期”，失效日期请填写为：2099-12-31；若税务登记证无失效日期，请与营业执照失效日期保持一致！" type="warning" showIcon />
        <Row style={{ marginTop: 15 }}>
          <Col sm={10}>
            <FormItem
              {...formItemLayout}
              label="营业执照号码"
              help="如已三证合一，请输入社会统一诚信代码"
            >
              {getFieldDecorator('organ_no', {
                rules: [
                  { required: true, length: 18, message: '组织机构编码只能为18位' }
                  // { validator: this.userExists },
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入营业执照号码" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="营业执照有效日期"
            >
              {getFieldDecorator('range-picker')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col sm={14} >
            <FormItem
              {...formItemLayout}
              label="税务登记号"
              help="如已三证合一，请输入18位社会统一诚信代码"
            >
              {getFieldDecorator('organ_name', {
                rules: [
                  { required: true, message: '组织机构名称必须输入' }
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入税务登记号" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="税务登记证失效日期"
              help="如已三证合一，请输入营业执照失效日期"
            >
              {getFieldDecorator('organ_name', {
                rules: [
                  { required: true, message: '组织机构名称必须输入' }
                ],
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入税务登记证失效日期" />
                )}
            </FormItem>
          </Col>
        </Row>
        <div className={styles.btnPanel}>
          <Button className={styles.btn} type="primary" htmlType="submit" size="large">保存</Button>
          <Button className={styles.btn} type="info" htmlType="submit" size="large">重置</Button>
        </div>
      </Form>
    </div>
  );
}

export default createForm()(BaseInfoForm);
