import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';

import { Table, Select, Input, Button, Row, Col, Popconfirm, Icon } from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import Modal from './Modal';
import styles from './List.css';

import columns from './columns';

import IButton from '../../../../components/ui/IButton';
import WithList from '../../../../hocs/WithList';
const List = ({ data, table, loading, tableName, selectedRowKeys, dispatch, namespace, keyword, removeHandler, onSearch, onChange, page, rowSelection, fetching }) => {
  const hasSelected = selectedRowKeys.length > 0;
  function handleChange(tableName) {
    dispatch(routerRedux.push({
      pathname: 'sys/cache',
      query: { tableName },
    }));
  }

  const children = [];
  for (let i = 0; i < table.length; i++) {
    children.push(<Option key={table[i].key}>{table[i].value}</Option>);
  }

  function title() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <Modal dispatch={dispatch} namespace={namespace} loading={loading}>
              <IButton type="primary" icon="fork" perm={`${namespace}:create`}>高级操作</IButton>
            </Modal>
            <Popconfirm title="确定要删除吗？" onConfirm={() => dispatch({type:`${namespace}/removeCache`, payload:'LOOZB:'})}>
              <IButton type="danger" icon="delete" perm="cache:remove">清除所有缓存</IButton>
            </Popconfirm>
            <Popconfirm title="确定要删除吗？" onConfirm={() => dispatch({type:`${namespace}/removeCurrentCache`, payload: tableName})}>
            <IButton type="danger" icon="delete" perm="cache:remove">清除当前缓存</IButton>
          </Popconfirm>
            <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
              <IButton type="danger" disabled={!hasSelected} icon="delete" perm="permission:remove">清除选择缓存</IButton>
            </Popconfirm>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : ''}</span>
          </Col>
          <Col span={12} style={{ float: 'right' }} >
            <Search size="large" style={{ width: 300, float: 'right' }} defaultValue={keyword} placeholder="输入权限名称或标识查询..." onSearch={value => onSearch(value)} />
            <Select
              showSearch
              style={{ width: 180, float: 'right', marginRight: '8px' }}
              placeholder="请选择表名"
              optionFilterProp="children"
              onChange={handleChange}
              defaultValue={tableName}
              size="large"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {children}
            </Select>
          </Col>
        </Row>
      </div>
    )
  }

  const toolBar = (text, record, index) => (
    <div>
      <Popconfirm title="确定要清除缓存吗？" onConfirm={() => removeHandler({ id: record.cacheKey })}>
        <IButton perm="cache:remove" a> 清除缓存 </IButton>
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
      scroll={{ y: table_height }}
      bordered
      rowKey="cacheKey"
      loading={fetching}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default WithList({ pathname: 'sys/cache' })(List);
