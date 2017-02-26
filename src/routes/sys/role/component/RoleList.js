import React, {PropTypes} from 'react';
import {Table,Select , Input, Alert,Button, Pagination, Row, Col, Popconfirm,Icon,Tooltip} from 'antd';
import styles from './RoleList.css';
const Option = Select.Option;
const Search = Input.Search;
const RoleList = ({data, pages, total, size, loading, selectedRowKeys, dispatch, namespace}) => {

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
    title: '角色名称',
    dataIndex: 'name',
    width:120
  }, {
    title: '角色标识',
    dataIndex: 'role',
    width:120
  }, {
    title: '角色描述',
    dataIndex: 'description',
    width:280,
  }, {
    title: '创建时间',
    dataIndex: 'ctime',
    width:140
  }, {
    title: '维护时间',
    dataIndex: 'mtime',
    width:140
  },{
    title: '操作',
    key: 'operation',
    width: 100,
    render: (text, record, index) => (
      <div>
        {isAuth('role:allot') ?
          <span>
            <a href="javascript:void(0)" onClick={() => onAuthItem(record)}>授权</a>
          </span>:''}
        {isAuth('role:update') ?
          <span>
          <span className="ant-divider" />
          <a href="javascript:void(0)" onClick={() => onUpdateItem(record.id)}>编辑</a>
          </span>:''}
        {isAuth('role:remove') ?
          <span>
            <span className="ant-divider" />
            <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
              <a href="javascript:void(0)">删除</a>
            </Popconfirm>
          </span>
           : ''}
      </div>
    )
  }];

  function onChange(pages, size) {
    if(size) {
      dispatch({type:`${namespace}/fetch`, payload:{pages, size}})
    } else {
      dispatch({type:`${namespace}/fetch`, payload:{pages}})
    }
  }
  function page() {
    return <Pagination
        total={total}
        className={styles.page}
        current={pages}
        pageSize={size}
        size="small"
        showTotal={total => `共 ${total} 条记录 第${pages}/${Math.ceil(total/size)}页`}
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
            {isAuth('role:create') ? <Button type="ghost" icon="plus-square" size="large">新增</Button>:''}
            {isAuth('role:remove') ?
              <span>
                <Popconfirm title={`确定删除选中的 ${selectedRowKeys.length} 条记录吗？`} onConfirm={() => onDeleteItem(selectedRowKeys)}>
                  <Button className="toolbarBtn" type="ghost" icon="delete" size="large" disabled={!hasSelected}>删除</Button>
                </Popconfirm>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了${selectedRowKeys.length}个对象` : ''}</span>
              </span>
            :''}
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

export default RoleList;
