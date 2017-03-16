import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import {Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message} from 'antd';
import ResourceModal from './ResourceModal';
import styles from './ResourceList.css';
const Option = Select.Option;
const Search = Input.Search;
const resourceList = ({data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword}) => {
  function removeHandler(params) {
    dispatch({
      type:`${namespace}/remove`,
      payload:params
    })
  }

  function onSearch(keyword) {
    if(keyword) {
      dispatch(routerRedux.push({
        pathname: '/sys/resource',
        query: { keyword },
      }));
    } else {
      message.warn('请输入查询条件');
    }
  }

  function onChange(current, size) {
    dispatch(routerRedux.push({
      pathname: '/sys/resource',
      query: { current, size },
    }));
  }

  const hasSelected = selectedRowKeys.length > 0;

  function title() {
    return (
      <div>
        <Row>
          <Col span={16}>
           <ResourceModal  record={{}} item={{id_:1, pids:'0/'}} dispatch={dispatch} namespace={namespace} option='create' loading={loading} title="新增资源">
            <Button type="primary" size="large" className={styles.btn} icon="plus">新增根节点</Button>
           </ResourceModal>
           <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
             <Button type="danger" size="large" disabled={!hasSelected} className={styles.btn} icon="delete">删除</Button>
           </Popconfirm>
           <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : ''}</span>
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
      {isAuth('resource:update') ? (
        <span>
          <ResourceModal record={{}} item={record} dispatch={dispatch} namespace={namespace} option='create' loading={loading} title="新增资源">
            <a>新增</a>
          </ResourceModal>
          <span className="ant-divider" />
          <ResourceModal record={record} dispatch={dispatch} namespace={namespace} option='update' loading={loading} title="编辑资源">
            <a>编辑</a>
          </ResourceModal>
        </span>
      ) : ''}
      {isAuth('resource:remove') ? (
        <span>
          <span className="ant-divider" />
          <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({id:record.id_})}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </span>) : ''}
    </div>
  )

  function getMenuType(text) {
    if(text === '1') {
      return '父子类型'
    } else if(text === '2') {
      return '分组类型'
    } else if(text === '3') {
      return '普通类型'
    } else {
      return '未知类型'
    }

  }

  const columns = [{
    title: '资源名称',
    dataIndex: 'name',
    width: 340,
  }, {
    title: '资源标识',
    dataIndex: 'identity',
    width: 180,
  }, {
    title: '图标',
    dataIndex: 'icon',
    width: 180,
  }, {
    title: '资源链接',
    dataIndex: 'url',
    width: 180,
  }, {
    title: '资源权重',
    dataIndex: 'weight',
    width: 100,
  }, {
    title: '资源类型',
    dataIndex: 'menuType',
    width: 100,
    render:(text, record, index) => (
      <div>
        {
          getMenuType(text)
        }
      </div>
    )
  }, {
    title: '拥有权限',
    dataIndex: 'permissionText',
    // width: 180,
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
    />
  )
}

export default resourceList;
