import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import {Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message} from 'antd';
import styles from './TableList.css';
const Option = Select.Option;
const Search = Input.Search;
const TableList = ({data, loading, dispatch, namespace, tableName, tableComment}) => {
  function title() {
    return (
      <div>
        <Row>
          <Col span={24} style={{padding:7}}>
            <span style={{ marginLeft: 6,fontSize:15 }}>{`当前表名：${tableName}，描述：${tableComment}`}</span>
          </Col>
        </Row>
      </div>
    )
  }

  const columns = [{
    title: '#',
    fixed:'left',
    width:50,
    render:(text, record, index) => (
      <span>{index + 1}</span>
    )
  },{
    title: '字段名',
    dataIndex: 'columnName',
    width:180
  }, {
    title: '注释',
    dataIndex: 'columnComment',
    // width:180
  }, {
    title: '默认值',
    dataIndex: 'columnDefault',
    width:120
  }, {
    title: '允许为空',
    dataIndex: 'isNullable',
    width:90,
  }, {
    title: '字段类型',
    dataIndex: 'columnType',
    width:140,
  }, {
    title: '主键',
    dataIndex: 'columnKey',
    width:80,
  }];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="middle"
      scroll={{ y: table_height + 50 }}
      bordered
      rowKey="columnName"
      loading={loading}
      title={() => title()}
    />
  )
}

export default TableList;
