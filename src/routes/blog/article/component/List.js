import React, { PropTypes } from 'react';
import { Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message } from 'antd';
import styles from './List.css';
import columns from './columns';
const Option = Select.Option;
const Search = Input.Search;
import { routerRedux } from 'dva/router';

import IButton from '../../../../components/ui/IButton';
import WithList from '../../../../hocs/WithList';

const ArticleList = ({ data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword, removeHandler, onSearch, onChange, page, rowSelection }) => {
  function confirmHandler(id) {
    dispatch({
      type: `${namespace}/confirm`,
      payload: id
    })
  }

  function topHandler(id) {
    dispatch({
      type: `${namespace}/topHandler`,
      payload: id
    })
  }

  const hasSelected = selectedRowKeys.length > 0;

  function title() {
    return (
      <div>
        <Row>
          <Col span={16}>
            <Button type="primary" size="large" onClick={() => dispatch(routerRedux.push({ pathname: '/blog/issue' }))} className={styles.btn} icon="plus">发布博文</Button>
            <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
              <Button type="danger" size="large" disabled={!hasSelected} className={styles.btn} icon="delete">删除</Button>
            </Popconfirm>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : ''}</span>
          </Col>
          <Col span={8} style={{ float: 'right' }} >
            <Search size="large" style={{ width: 300, float: 'right' }} defaultValue={keyword} placeholder="输入权限名称或标识查询..." onSearch={value => onSearch(value)} />
            <Tooltip placement="left" title="无缓存刷新">
              <Icon type="reload" className="reloadBtn" onClick={() => onSearch({ noCache: 'yes' })} />
            </Tooltip>
          </Col>
        </Row>
      </div>
    )
  }

  const toolBar = (text, record, index) => (
    <div>
      <Popconfirm title={record.confirm === '1' ? '确定取消确认吗？' : '确定要确认该博文吗？'} onConfirm={() => confirmHandler({ id: record.id_ })}>
        <a href="javascript:void(0)">{record.confirm === '1' ? '取消确认' : '确认博文'}</a>
      </Popconfirm>
      <IButton perm={`${namespace}:update`} onClick={() => dispatch({ type: `${namespace}/queryById`, payload: record.id_ })} a>
        <span className="ant-divider" />编辑
      </IButton>
      <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({ id: record.id_ })}>
        <IButton perm={`${namespace}:remove`} a><span className="ant-divider" /> 删除</IButton>
      </Popconfirm>
      <span className="ant-divider" />
      <Popconfirm title="确定要置顶吗？" onConfirm={() => topHandler(record.id_)}>
        <a href="javascript:void(0)">{record.sort === '0' ? '置顶博文' : '取消置顶'}</a>
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
      scroll={{ y: table_height, x: 1980 }}
      bordered
      rowKey="id_"
      loading={loading}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default WithList({ pathname: 'blog/article' })(ArticleList);
