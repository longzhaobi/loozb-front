import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';

import {Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message, Badge} from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import styles from './List.css';

const List = ({data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword, user}) => {
  function removeOnlineHandler(record) {
    if(record.online == '0') {
      message.warn("此用户已处于离线状态");
    } else {
      dispatch({
      type:`${namespace}/remove`,
      payload:{token: record.sessionId}
    })
    }
    
  }

  function onSearch(keyword) {
    if(keyword) {
      dispatch(routerRedux.push({
        pathname: '/sys/log',
        query: { keyword },
      }));
    } else {
      message.warn('请输入查询条件');
    }
  }

  function onChange(current, size) {
    dispatch(routerRedux.push({
      pathname: '/sys/log',
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
      />);
  }

  function title() {
    return (
      <div>
        <Row>
          <Col span={16}>
           <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
             <Button type="danger" size="large" icon="delete">全部下线</Button>
           </Popconfirm>
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
      <Popconfirm title="确定要删除吗？" onConfirm={() => removeOnlineHandler(record)}>
        <a href="javascript:void(0)" disabled={ record.userId === user.id || record.online == '0'}>强制下线</a>
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
    title: '状态',
    dataIndex: 'online',
    width:100,
    render: (text, record, index) =>(
      <div>
      {
        text == '1' ? <Badge status="success" text="在线"/>: <Badge status="default" text="离线"/>
      }
      </div>
    )
  },{
    title: '会话ID',
    dataIndex: 'sessionId',
    width:280
  }, {
    title: '用户',
    dataIndex: 'account',
    width:140,
  }, {
    title: 'IP',
    dataIndex: 'ip',
    width:180,
  }, {
    title: '登录时间',
    dataIndex: 'startTime',
    width:340,
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
      scroll={{ y: table_height, x:1670 }}
      bordered
      rowKey="id_"
      loading={loading}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default List;
