import React, {PropTypes} from 'react';
import {Table,Select , Menu,Input, Alert,Button, Pagination, Row, Col} from 'antd';
import { Link } from 'dva/router';
const Option = Select.Option;
const Search = Input.Search;
const TableSelect = ({table, loading, dispatch, namespace}) => {
  const columns = [{
    title: '表名',
    dataIndex: 'tableName',
    width:220
  }
  , {
    title: '注释',
    dataIndex: 'tableComment',
    // width:380
  }];

  function title() {
    return (
      <div>
        <Row>
          <Col span={24} >
            <Search size="large" style={{width:300,float:'left'}} placeholder="输入表名、表注释、字段注释查询..." onSearch={value => dispatch({type:`${namespace}/fetchTable`,payload:{keyword:value}})} />
          </Col>
        </Row>
      </div>
    )
  }


  function onRowClick (record, index) {
    dispatch({
      type:`${namespace}/fetchColumn`,
      payload:{tableName:record.tableName, tableComment:record.tableComment}
    });
  }

  return (
      <Table
        columns={columns}
        dataSource={table}
        pagination={false}
        size="middle"
        onRowClick={onRowClick}
        scroll={{y: table_height+50}}
        bordered
        rowKey="tableName"
        loading={loading}
        title={() => title()}
        // footer={() => page()}
      />
  )
}

export default TableSelect;
