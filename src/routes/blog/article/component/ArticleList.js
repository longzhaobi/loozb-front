import React, {PropTypes} from 'react';
import {Table, Select, Input, Alert, Button, Pagination, Row, Col, Popconfirm, Icon, Tooltip, message} from 'antd';
import styles from './ArticleList.css';
const Option = Select.Option;
const Search = Input.Search;
import { routerRedux } from 'dva/router';
const ArticleList = ({data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword}) => {
  function removeHandler(params) {
    dispatch({
      type:`${namespace}/remove`,
      payload:params
    })
  }

  function onSearch(keyword) {
    if(keyword) {
      dispatch(routerRedux.push({
        pathname: '/blog/article',
        query: { keyword },
      }));
    } else {
      message.warn('请输入查询条件');
    }
  }

  function onChange(current, size) {
    dispatch(routerRedux.push({
      pathname: '/blog/article',
      query: { current, size },
    }));
  }

  function confirmHandler(id) {
    dispatch({
      type:`${namespace}/confirm`,
      payload:id
    })
  }

  function topHandler(id) {
    dispatch({
      type:`${namespace}/topHandler`,
      payload:id
    })
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
          <Button type="primary" size="large" onClick={() => dispatch(routerRedux.push({pathname: '/blog/issue'}))} className={styles.btn} icon="plus">发布博文</Button>
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
      <Popconfirm title={record.confirm === '1' ? '确定取消确认吗？' : '确定要确认该博文吗？'} onConfirm={() => confirmHandler({id:record.id_})}>
        <a href="javascript:void(0)">{record.confirm === '1' ? '取消确认' : '确认博文'}</a>
      </Popconfirm>
      {isAuth('permission:update') ? (
        <span>
          <span className="ant-divider" />
          <a href='javascript:void(0)' onClick={() => dispatch({type:`${namespace}/queryById`,payload:record.id_})}>编辑</a>
        </span>
      ) : ''}
      {isAuth('permission:remove') ? (
        <span>
          <span className="ant-divider" />
          <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({id:record.id_})}>
            <a href="javascript:void(0)">删除</a>
          </Popconfirm>
        </span>) : ''}
        <span className="ant-divider" />
        <Popconfirm title="确定要置顶吗？" onConfirm={() => topHandler(record.id_)}>
          <a href="javascript:void(0)">{record.sort === 0 ? '置顶博文' : '取消置顶'}</a>
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
    title: '标题',
    dataIndex: 'title',
    width:380
  }, {
    title: '作者',
    dataIndex: 'author',
    width:180,
  }, {
    title: '原文链接',
    dataIndex: 'originalUrl',
    width:340,
    render: (text, record, index) => (
      <span>{record.type == '1' ? `http://blog.loozb.com/articles/${record.id_}` : text}</span>
    )
  }, {
    title: '阅读次数',
    dataIndex: 'readNum',
    width:120,
  }, {
    title: '文章排序',
    dataIndex: 'sort',
    width:120,
  }, {
    title: '文章类型',
    dataIndex: 'type',
    width:120,
    render: (text, record, index) => (
      <span dangerouslySetInnerHTML={{__html:text == '1' ? '原创' : '转载'}}></span>
    )
  }, {
    title: '是否确认',
    dataIndex: 'confirm',
    width:120,
    render: (text, record, index) => (
      <span dangerouslySetInnerHTML={{__html:text == '1' ? '已确认' : '<span style="color:red;">未确认</span>'}}></span>
    )
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
    width: 240,
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
      scroll={{ y: table_height, x: 1940 }}
      bordered
      rowKey="id_"
      loading={loading}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default ArticleList;
