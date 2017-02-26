import React, {PropTypes} from 'react';
import {Table,Select , Input, Alert,Button, Pagination, Row, Col, Popconfirm,Icon,Tooltip} from 'antd';
import styles from './UserList.css';
const Option = Select.Option;
const Search = Input.Search;
const UserList = ({data, pageNum, total, pageSize, loading,selectedRowKeys,dispatch,namespace}) => {

  function onAuthItem(item) {
    dispatch({
      type: `${namespace}/doAuth`,
      payload: {item: item}
    });
  }

  function onUpdateItem(id) {
    dispatch({
      type: `${namespace}/doUpdate`,
      payload: id
    })
  }

  function onDeleteItem(params) {
    dispatch({
      type:`${namespace}/remove`,
      payload:params
    })
  }
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
    dataIndex: 'roleText',
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
    width: 120,
    fixed: 'right',
    render: (text, record, index) => (
      <div>
      {isAuth('user:allot') ? (<a href="javascript:void(0)" onClick={() => onAuthItem(record)}>授权</a>) : ''}
      {isAuth('user:update') ? (<span><span className="ant-divider" /><a href="javascript:void(0)" onClick={() => onUpdateItem(record.id)}>编辑</a></span>) : ''}
      {isAuth('user:remove') ? (
        <span>
          <span className="ant-divider" />
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </span>) : ''}
      </div>
    )
  }];

  function onChange(pageNum, pageSize) {
    if(pageSize) {
      dispatch({type:`${namespace}/fetch`, payload:{pageNum, pageSize}})
    } else {
      dispatch({type:`${namespace}/fetch`, payload:{pageNum}})
    }

  }
  function page() {
    return <Pagination
        total={total}
        className={styles.page}
        current={pageNum}
        pageSize={pageSize}
        size="small"
        showTotal={total => `共 ${total} 条记录 第${pageNum}/${Math.ceil(total/pageSize)}页`}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={onChange}
        onChange={onChange}
      />
  }

  const hasSelected = selectedRowKeys.length > 0;
  function title() {
    return (
      <div>
        <Row>
          <Col span={16}>
            {isAuth('user:create') ? <Button type="ghost" size="large" icon="plus-square">新增</Button> : ''}
            {isAuth('user:create') ? <span>
              <Popconfirm title={`确定删除选中的 ${selectedRowKeys.length} 条记录吗？`} onConfirm={() => onDeleteItem(selectedRowKeys)}>
                <Button className="toolbarBtn" type="ghost" size="large" icon="delete" disabled={!hasSelected}>删除</Button>
              </Popconfirm>
              <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了${selectedRowKeys.length}个对象` : ''}</span>
            </span> : ''}
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
        payload:{id:record.id, selected}
      });
    },
    onSelectAll(selected, selectedRows, changeRows) {
      dispatch({
        type:`${model}/onChangeSelectedRowKeys`,
        payload:selectedRows.map(tag => tag.id)
      });
    }
  };
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
