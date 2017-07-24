import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';

import {Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message} from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import UserModal from './UserModal';
import AuthModal from './AuthModal';
import styles from './UserList.css';

import IButton from '../../../../components/ui/IButton';
import WithCRUD from '../../../../hocs/WithCRUD';

const UserList = ({data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword}) => {
  function removeHandler(params) {
    dispatch({
      type:`${namespace}/remove`,
      payload:params
    })
  }

  function lockedHandler(id, locked, idcard) {
    const params = {
      id,
      locked: locked === '0' ? '1' : '0',
      idcard
     }
    dispatch({
      type: `${namespace}/update`,
      payload: params,
      callback(data) {
        dispatch({ type: 'app/result',payload:{data, namespace}});
      }
    })
  }

  function onSearch(keyword) {
    if(keyword) {
      dispatch(routerRedux.push({
        pathname: '/sys/user',
        query: { keyword },
      }));
    } else {
      message.warn('请输入查询条件');
    }
  }

  function onChange(current, size) {
    dispatch(routerRedux.push({
      pathname: '/sys/user',
      query: { current, size },
    }));
  }
  function page() {
    return (<Pagination
        total={total}
        className={styles.page}
        current={current}
        pageSize={size}
        size="small"
        showTotal={total => `共 ${total}条记录 第${current}/${Math.ceil(total/size)}页`}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={onChange}
        onChange={onChange}
      />)
  }
  const hasSelected = selectedRowKeys.length > 0;

  function title() {
    return (
      <div>
        <Row>
          <Col span={16}>
           <UserModal  record={{}} dispatch={dispatch} namespace={namespace} option='create' loading={loading} title="新增用户">
            <IButton type="primary" icon="plus" perm="user:create"> 新增 </IButton>
           </UserModal>
           <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
             <IButton type="danger" disabled={!hasSelected} perm="user:remove"  icon="delete">删除</IButton>
           </Popconfirm>
           <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : ''}</span>
          </Col>
          <Col span={8} style={{float:'right'}} >
            <Search size="large" style={{width:300,float:'right'}} defaultValue={keyword} placeholder="输入任务名称查询..." onSearch={value => onSearch(value)} />
          </Col>
        </Row>
      </div>
    )
  }

  const rowSelection = {
    selectedRowKeys,
    onChange(selectedRowKeys) {
      dispatch({
        type:`${namespace}/onChangeSelectedRowKeys`,
        payload:selectedRowKeys
      });
    }
  };

  const toolBar= (text, record, index) => (
    <div>
      <AuthModal record={record} dispatch={dispatch} namespace={namespace} loading={loading}>
        <IButton perm="user:allot" a> 授权 </IButton>
      </AuthModal>
      <UserModal record={record} dispatch={dispatch} namespace={namespace} option='update' loading={loading} title="编辑用户">
        <IButton perm="user:update" a> <span className="ant-divider" />编辑 </IButton>
      </UserModal>
      <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({id:record.id_})}>
        <IButton perm="user:remove" a> <span className="ant-divider" />删除 </IButton>
      </Popconfirm>
      <Popconfirm title="确定要继续吗？" onConfirm={() => lockedHandler(record.id_, record.locked, record.idcard)}>
        <IButton perm="user:remove" a> <span className="ant-divider" />{record.locked === '1' ? '解锁' : '锁定'} </IButton>
      </Popconfirm>
    </div>
  )

  const columns = [{
    title: '#',
    fixed:'left',
    width:50,
    render:(text, record, index) => (
      <span>{index + 1}</span>
    )
  },{
    title: '姓名',
    className: 'column-money',
    dataIndex: 'name',
    width:120
  },{
    title: '用户名',
    className: 'column-money',
    dataIndex: 'username',
    width:120
  }, {
    title: '性别',
    dataIndex: 'gender',
    width:60,
    render:(text, record, index) => (
      <span>{text == '1' ? '男' : '女'}</span>
    )
  }, {
    title: '身份证号码',
    dataIndex: 'idcard',
    width:180
  }, {
    title: '联系地址',
    dataIndex: 'address',
    width:380,
  }, {
    title: '联系电话',
    dataIndex: 'phone',
    width:140
  }, {
    title: '是否锁住',
    dataIndex: 'locked',
    width:80,
    render:(text, record, index) => (
      <span>{text == '1' ? '已锁住':'未锁住'}</span>
    )
  }, {
    title: '拥有角色',
    dataIndex: 'roleNames',
    // width:180
  }, {
    title: '注册日期',
    dataIndex: 'ctime',
    width:180
  }, {
    title: '维护日期',
    dataIndex: 'mtime',
    width:180
  },{
    title: '操作',
    key: 'operation',
    width: 180,
    fixed: 'right',
    render: (text, record, index) => toolBar(text, record, index)
  }];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowSelection={rowSelection}
      size="middle"
      scroll={{ y: table_height,x:1950 }}
      bordered
      rowKey="id_"
      loading={loading}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default WithCRUD()(UserList);
