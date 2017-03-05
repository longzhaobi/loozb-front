import React, {PropTypes} from 'react';
import {Table,Select , Input, Alert,Button, Pagination, Row, Col, Popconfirm,Icon,Tooltip} from 'antd';
import UserModal from './UserModal';
import AuthModal from './AuthModal';
import styles from './UserList.css';
const Option = Select.Option;
const Search = Input.Search;
const UserList = ({data, pages, total, size, loading, selectedRowKeys, dispatch, namespace, roles}) => {

  function fetchRoles(item) {
    dispatch({
      type: `${namespace}/fetchRoles`,
      payload: {item: item}
    });
  }

  function removeHandler(id) {
    dispatch({
      type:`${namespace}/remove`,
      payload:id
    })
  }

  function editHandler(id, params) {
    dispatch({
      type: `${namespace}/update`,
      payload: { id, params }
    });
  }

  function createHandler(values) {
    dispatch({
      type: `${namespace}/create`,
      payload: values,
    });
  }

  function authHandler(id, params) {
    dispatch({
      type: `${namespace}/auth`,
      payload: { id, params }
    });
  }

  function onChange(pages, size) {
    if(size) {
      dispatch({type:`${namespace}/fetch`, payload:{pages, size}})
    } else {
      dispatch({type:`${namespace}/fetch`, payload:{pages}})
    }

  }
  function page() {
    return (<Pagination
        total={total}
        className={styles.page}
        current={pages}
        pageSize={size}
        size="small"
        showTotal={total => `共 ${total} 条记录 第${pages}/${Math.ceil(total/size)}页`}
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
           <UserModal  record={{}} onOk={createHandler} title="新增用户">
            <Button type="primary" size="large" className={styles.btn} icon="plus">新增</Button>
           </UserModal>
          </Col>
          <Col span={8} style={{float:'right'}} >
            <Search size="large" style={{width:300,float:'right'}} placeholder="输入任务名称查询..." onSearch={value => onSearch({keyword:value})} />
            <Tooltip placement="left" title="无缓存刷新">
              <Icon type="reload" className="reloadBtn" onClick={() => onSearch({noCache:'yes'})}/>
            </Tooltip>
          </Col>
        </Row>
      </div>
    )
  }
  const rowSelection = {
    onSelect(record, selected, selectedRows) {
      dispatch({
        type:`${namespace}/onChangeSelectedRowKeys`,
        payload:{id:record.id_, selected}
      });
    },
    onSelectAll(selected, selectedRows, changeRows) {
      dispatch({
        type:`${model}/onChangeSelectedRowKeys`,
        payload:selectedRows.map(tag => tag.id_)
      });
    }
  };

  const toolBar= (text, record, index) => (
    <div>
      {isAuth('user:allot') ? (
        <AuthModal record={record} roles={roles} onRoles = {fetchRoles} onOk = {authHandler.bind(null, record.id_)}>
          <a>授权</a>
        </AuthModal>
        ) : ''
      }
      {isAuth('user:update') ? (
        <span>
          <span className="ant-divider" />
          <UserModal record={record} onOk={editHandler.bind(null, record.id_)} title="编辑用户">
            <a>编辑</a>
          </UserModal>
        </span>
      ) : ''}
      {isAuth('user:remove') ? (
        <span>
          <span className="ant-divider" />
          <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(record.id_)}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </span>) : ''}
    </div>
  )

  const columns = [{
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
    width:180,
  }, {
    title: '出生日期',
    dataIndex: 'birthday',
    width:140,
  }, {
    title: '邮箱',
    dataIndex: 'email',
    width:180,
  }, {
    title: '联系电话',
    dataIndex: 'phone',
    width:140
  }, {
    title: '工作职位',
    dataIndex: 'job',
    width:100
  }, {
    title: '是否锁住',
    dataIndex: 'locked',
    width:80,
    render:(text, record, index) => (
      <span>{record == '1' ? '已锁住':'未锁住'}</span>
    )
  }, {
    title: '拥有角色',
    dataIndex: 'roleNames',
    width:180
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
    width: 150,
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
      scroll={{ y: 700,x:1650 }}
      bordered
      rowKey="id"
      loading={loading}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default UserList;
