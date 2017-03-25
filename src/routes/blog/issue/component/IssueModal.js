import React, { Component } from 'react';
import { Form, Select, Input, Button, Icon, Row, Col, Modal} from 'antd';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const Option = Select.Option;
class IssueModal extends Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {
      visible: false,
      type:'1',
      classifications:[]
    };
  }

  showModelHandler = (e) => {
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    const _self = this;
    const {dispatch, namespace} = this.props;
    //显示之前去查询所有角色信息
    dispatch({
      type: `${namespace}/fetchClassifications`,
      callback(response) {
        dispatch({ type: 'app/result',payload:{response, namespace}, onHander({data}) {
          _self.setState({
            visible: true,
            classifications:data
          });
        } });
      }
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
      type:'1'
    });
  }

  handleSelectChange = (value) => {
    this.setState({
      type:value
    });
  }

  okHandler = () => {
    const { title, dispatch, namespace, option, record } = this.props;
    this.props.form.validateFields((err, params) => {
      if (!err) {
        params.classification = params.classification.join();
        const param = {...params, ...record};
        Modal.confirm({
          title: `确定继续吗？`,
          content: 'Bla bla ...',
          okText: '确定',
          cancelText: '取消',
          onOk:() => {
            const _self = this;
            dispatch({
              type: `${namespace}/create`,
              payload: param,
              callback(response) {
                dispatch({ type: 'app/result',payload:{response, namespace}, onHander() {
                  dispatch(routerRedux.push({
                    pathname: '/blog/article'
                  }));
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

    const formItemLayout1 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };

    const classificationsOption = [];
    for (let i = 0; i < this.state.classifications.length; i++) {
      classificationsOption.push(<Option key={this.state.classifications[i].id_}>{this.state.classifications[i].name}</Option>);
    }

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title='确认信息'
          visible={this.state.visible}
          width={760}
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
                label="类型"
                {...formItemLayout}
              >
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: '请选择文章类型!' }],
                  initialValue: record['type'] || '1',
                  onChange: this.handleSelectChange,
                })(
                  <Select placeholder="请选择文章类型">
                    <Option value="1">原创</Option>
                    <Option value="2">转载</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col sm={12}>
              {
                this.state.type === '2' ? <FormItem
                  {...formItemLayout}
                  label="作者"
                  >
                  {getFieldDecorator('username', {
                    rules: [
                        { required: true, min: 2, message: '作者名称不能小于2位' },
                        { max: 20, message: '作者名称不能超过20位' },
                        // { validator: this.userExists },
                      ],
                      initialValue: record['author'] || ''
                    })(
                    <Input type="text" placeholder="请输入作者名称" />
                  )}
                </FormItem> : ''
              }

            </Col>
          </Row>
          {
            this.state.type === '2' ? <Row gutter={0}>
              <Col sm={24}>
                <FormItem
                  label="原文链接"
                  {...formItemLayout1}
                >
                  {getFieldDecorator('originalUrl', {
                    rules: [{ required: false, message: '请输入原文链接!' }],
                    initialValue: record['originalUrl'] || '',
                    onChange: this.handleSelectChange,
                  })(
                    <Input type="text" placeholder="原文链接" />
                  )}
                </FormItem>
              </Col>
            </Row> : ''
          }
          <Row gutter={0}>
            <Col sm={24}>
              <FormItem
                label="摘要"
                {...formItemLayout1}
              >
                {getFieldDecorator('digest', {
                  rules: [
                    { max: 250, message: '摘要不能超过250位' },
                  ],
                  initialValue: record['digest'] || '',
                  onChange: this.handleSelectChange,
                })(
                  <Input type="textarea" placeholder="摘要信息，如果不输入截取文章信息" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col sm={24}>
            <FormItem
              {...formItemLayout1}
              label="文章分类"
            >
              {getFieldDecorator('classification', {
                 initialValue: (record['classification'] == "" || record['classification'] == null) ? Array.of() : record['classification'].split(',') || []
               })(
                 <Select
                   multiple
                   placeholder="请选择角色信息"
                  //  defaultValue={['a10', 'c12']}
                  //  onChange={handleChange}
                 >
                   {classificationsOption}
                 </Select>
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

export default Form.create()(IssueModal);
