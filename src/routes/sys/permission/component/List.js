import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';

import {Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message} from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import Modal from './Modal';
import styles from './List.css';

import IButton from '../../../../components/ui/IButton';

const List = ({ data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword }) => {
  function removeHandler(params) {
    dispatch({
      type:`${namespace}/remove`,
      payload:params
    })
  }

  function onSearch(keyword) {
    if(keyword) {
      dispatch(routerRedux.push({
        pathname: '/sys/permission',
        query: { keyword },
      }));
    } else {
      message.warn('请输入查询条件');
    }
  }

  function onChange(current, size) {
    dispatch(routerRedux.push({
      pathname: '/sys/permission',
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
           <Modal  record={{}} dispatch={dispatch} namespace={namespace} option='create' loading={loading} title="新增权限">
            <IButton type="primary" icon="plus" perm="permission:create">新增</IButton>
           </Modal>
           <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
             <IButton type="danger" disabled={!hasSelected} icon="delete" perm="permission:remove">删除</IButton>
           </Popconfirm>
           <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : ''}</span>
          </Col>
          <Col span={8} style={{float:'right'}} >
            <Search size="large" style={{width:300,float:'right'}} defaultValue={keyword} placeholder="输入权限名称或标识查询..." onSearch={value => onSearch(value)} />
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
        <Modal record={record} dispatch={dispatch} namespace={namespace} option='update' loading={loading} title="编辑权限">
          <IButton perm="permission:update" a> 编辑 </IButton>
        </Modal>
        <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({id:record.id_})}>
          <IButton perm="dic:remove" a> <span className="ant-divider" /> 删除 </IButton>
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
    title: '权限名称',
    dataIndex: 'name',
    width:180
  }, {
    title: '权限标识',
    dataIndex: 'permission',
    width:180,
  }, {
    title: '描述',
    dataIndex: 'description',
    // width:140,
  }, {
    title: '创建日期',
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

export default List;
