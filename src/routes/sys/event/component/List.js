import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';

import {Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message} from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import styles from './List.css';
import WithList from '../../../../hocs/WithList';

const List = ({data, loading, selectedRowKeys, dispatch, namespace, keyword, removeHandler, onSearch, onChange, page, rowSelection, fetching}) => {
  
  // const hasSelected = selectedRowKeys.length > 0;

  function title() {
    return (
      <div>
        <Row>
          <Col span={16}>
          </Col>
          <Col span={8} style={{float:'right'}} >
            <Search size="large" style={{width:300,float:'right'}} defaultValue={keyword} placeholder="输入权限名称或标识查询..." onSearch={value => onSearch(value)} />
            <Tooltip placement="left" title="无缓存刷新">
              <Icon type="reload" className="reloadBtn" onClick={() => onSearch({noCache:'yes'})}/>
            </Tooltip>
          </Col>
        </Row>
      </div>
    )
  }

  const toolBar= (text, record, index) => (
    <div>
      {isAuth('log:remove') ? (
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
    title: '日志标题',
    dataIndex: 'title',
    width:280
  }, {
    title: '操作用户',
    dataIndex: 'username',
    width:140,
  }, {
    title: '请求URL',
    dataIndex: 'requestUri',
    width:180,
  }, {
    title: '请求参数',
    dataIndex: 'parameters',
    width:340,
  },{
    title: '请求方法',
    dataIndex: 'method',
    width:120
  }, {
    title: '请求IP',
    dataIndex: 'clientHost',
    width:180,
  }, {
    title: '请求客户端',
    dataIndex: 'userAgent',
    width:300,
  },{
    title: '请求状态',
    dataIndex: 'status',
    width:180
  }, {
    title: '备注',
    dataIndex: 'remark',
    // width:180,
  }, {
    title: '创建日期',
    dataIndex: 'ctime',
    width:180
  }, {
    title: '维护日期',
    dataIndex: 'mtime',
    width:180
  }];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="middle"
      scroll={{ y: table_height, x:2500 }}
      bordered
      rowKey="id_"
      loading={fetching}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default WithList({pathname: 'sys/event'})(List);
