import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';

import { Table, Select, Input, Button, Row, Col, Popconfirm, Icon } from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import styles from './List.css';
import WithList from '../../../../hocs/WithList';
import columns from './columns';

const List = ({ data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword, user, onSearch, onChange, page, rowSelection }) => {
  function removeOnlineHandler(record) {
    if (record.online == '0') {
      message.warn("此用户已处于离线状态");
    } else {
      dispatch({
        type: `${namespace}/remove`,
        payload: { token: record.sessionId }
      })
    }

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
          <Col span={8} style={{ float: 'right' }} >
            <Search size="large" style={{ width: 300, float: 'right' }} defaultValue={keyword} placeholder="输入权限名称或标识查询..." onSearch={value => onSearch(value)} />
          </Col>
        </Row>
      </div>
    )
  }

  const toolBar = (text, record, index) => (
    <div>
      <Popconfirm title="确定要删除吗？" onConfirm={() => removeOnlineHandler(record)}>
        <a href="javascript:void(0)" disabled={record.userId === user.id || record.online == '0'}>强制下线</a>
      </Popconfirm>
    </div>
  )

  return (
    <Table
      columns={columns(toolBar)}
      dataSource={data}
      pagination={false}
      rowSelection={rowSelection}
      size="middle"
      scroll={{ y: table_height, x: 1670 }}
      bordered
      rowKey="id_"
      loading={loading}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default WithList({pathname:'sys/session'})(List);
