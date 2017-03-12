import React, { Component } from 'react';
import { Form, Modal,Alert,Row, Col,Tree, Table, Checkbox , Button ,message} from 'antd';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

class AuthModal extends Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      auths: [],
      pid:null,
      roleId:null,
      visible: false,

      treeData:[],
      colsData:[],
      authData:[],
      datas:[]
    };
  }

  //选择左边的树
  onSelect(selectedKeys, info) {
    //每次选择，把auths清0
    this.state.auths = [];
    const {record, namespace, dispatch} = this.props;
    const pid = selectedKeys.join("");
    const roleId = record.id_;
    if(roleId && pid){
      const _self = this;
      this.state.pid = pid;
      this.state.roleId = roleId;
      dispatch({
        type:`${namespace}/fetchAuthList`,
        payload:{roleId, pid},
        callback(authData) {
          console.log(authData);
          _self.setState({
            authData
          });
        }
      });
    }
  };

  //选中checkbox触发事件
  onChange(e) {
    let checked = e.target.checked;
    let value = e.target.value;
    let authArr = this.state.auths;
    if(checked) {
      authArr.push(value);
    } else {
      for(let i = 0; i < authArr.length; i++) {
        if(authArr[i] === value) {
          authArr.splice(i,1);
        }
      }
    }
  };

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    const _self = this;
    const {dispatch, namespace, record} = this.props;
    dispatch({
      type:`${namespace}/fetchAuth`,
      payload:{roleId:record.id_, pid:0},
      callback(treeData, colsData, authData) {
        _self.setState({
          visible: true,
          treeData,
          colsData,
          authData
        });
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
    const pid = this.state.pid
    if(!pid) {
      message.error('请选择需要授权的资源信息');
      return;
    }
    const roleId = this.state.roleId;
    const auths = this.state.auths.join("·");
    if(roleId && roleId !== 0) {
      Modal.confirm({
        title: '确定授权吗？',
        onOk() {
          const params = {
            roleId:roleId,
            pid:pid,
            auths:auths
          }
          dispatch({type:`${namespace}/doAuth`, payload:params, callback(response) {
            if(response) {
              const {data} = response;
              if(data.httpCode === 200) {
                message.success("授权成功");
              }
            }
          }});
        },
        okText: '确定',
        cancelText: '取消',
      });
    } else {
      message.error('参数非法，未获取到角色信息');
    }
  };

  render() {
    const { children, record, loading } = this.props;

    const tree = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.id} title={item.name} isLeaf={item.isLeaf ? true:false}>
            {tree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.name} isLeaf={item.isLeaf ? true:false}/>;
    });


    const datas = [];
    this.state.datas = [];
    this.state.auths = [];
    for(let item of this.state.authData) {
      let obj = {};
      obj['key'] = item.key;
      obj[item.name] = item.isAuth;
      if(item.children) {
        //假如有孩子，添加
        item.children.map((child) => {
          let isAuth = child.isAuth ==='yes';
          if(child.disable === 'yes') {
            obj[child.name] = <Checkbox disabled></Checkbox>;
          } else {
            //判断是否有权限的值，如果有的话假如auths数组里
            if(isAuth) {
              this.state.auths.push(child.value);
            }
            obj[child.name] = <Checkbox value={child.value} onChange={this.onChange} defaultChecked={isAuth}></Checkbox>;
          }
        });
      }
      datas.push(obj);
    }
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title='角色授权'
          visible={this.state.visible}
          width={1200}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          footer = {[
            <Button key="back" type="ghost" size="large" onClick={this.hideModelHandler}>取消</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.okHandler} size="large" >
              授权
            </Button>
          ]}
        >
          <div style={{height:380,margin:-10}}>
            <Alert message = {`当前角色：${record.name}`} type="success" />
            <Row>
              <Col span={5} style={{border:'1px solid #eee'}}>
              <Tree
                className="myCls"
                defaultExpandedKeys={["1"]}
                defaultSelectedKeys={["1"]}
                onSelect={this.onSelect}
              >
                {tree(this.state.treeData)}
              </Tree>
              </Col>
              <Col span={19}>
                <Table columns={this.state.colsData} dataSource={datas} rowKey="key"  pagination = {false} bordered size="small" />
              </Col>
            </Row>
          </div>
        </Modal>
      </span>
    );
  }
}

export default AuthModal;
