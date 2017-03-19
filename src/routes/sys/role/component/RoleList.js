import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import {Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message} from 'antd';
import RoleModal from './RoleModal';
import AuthModal from './AuthModal';
import styles from './RoleList.css';
const Option = Select.Option;
const Search = Input.Search;
const RoleList = ({data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword}) => {
  function removeHandler(params) {
    dispatch({
      type:`${namespace}/remove`,
      payload:params
    })
  }

  function onSearch(keyword) {
    if(keyword) {
      dispatch(routerRedux.push({
        pathname: '/sys/role',
        query: { keyword },
      }));
    } else {
      message.warn('请输入查询条件');
    }
  }

  function onChange(current, size) {
    dispatch(routerRedux.push({
      pathname: '/sys/role',
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
           <RoleModal  record={{}} dispatch={dispatch} namespace={namespace} option='create' loading={loading} title="新增用户">
            <Button type="primary" size="large" className={styles.btn} icon="plus">新增</Button>
           </RoleModal>
           <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
             <Button type="danger" size="large" disabled={!hasSelected} className={styles.btn} icon="delete">删除</Button>
           </Popconfirm>
           <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : ''}</span>
          </Col>
          <Col span={8} style={{float:'right'}} >
            <Search size="large" style={{width:300,float:'right'}} defaultValue={keyword} placeholder="输入任务名称查询..." onSearch={value => onSearch(value)} />
            <Tooltip placement="left" title="无缓存刷新">
              <Icon type="reload" className="reloadBtn" onClick={() => onSearch({noCache:'yes'})}/>
            </Tooltip>
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
      {isAuth('role:allot') ? (
        <AuthModal record={record} dispatch={dispatch} namespace={namespace} loading={loading}>
          <a>授权</a>
        </AuthModal>
        ) : ''
      }
      {isAuth('role:update') ? (
        <span>
          <span className="ant-divider" />
          <RoleModal record={record} dispatch={dispatch} namespace={namespace} option='update' loading={loading} title="编辑用户">
            <a>编辑</a>
          </RoleModal>
        </span>
      ) : ''}
      {isAuth('role:remove') ? (
        <span>
          <span className="ant-divider" />
          <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({id:record.id_})}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </span>) : ''}
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
    title: '角色名称',
    dataIndex: 'name',
    width:180
  }, {
    title: '角色标识',
    dataIndex: 'role',
    width:180,
  }, {
    title: '描述',
    dataIndex: 'description',
    // width:140,
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
      scroll={{ y: table_height }}
      bordered
      rowKey="id_"
      loading={loading}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default RoleList;
