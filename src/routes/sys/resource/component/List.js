import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';

import {Table, Select, Input, Button, Row, Col, Popconfirm, Icon} from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import columns from './columns';

import Modal from './Modal';
import styles from './List.css';

import IButton from '../../../../components/ui/IButton';
import WithList from '../../../../hocs/WithList';
const List = ({data, current, total, size, loading, selectedRowKeys, dispatch, namespace, keyword, removeHandler, onSearch, onChange, page, rowSelection, fetching}) => {

  const hasSelected = selectedRowKeys.length > 0;

  function title() {
    return (
      <div>
        <Row>
          <Col span={16}>
           <Modal  record={{}} item={{id_:1, pids:'0/'}} dispatch={dispatch} namespace={namespace} option='create' loading={loading} title="新增资源">
              <IButton type="primary" icon="plus" perm="resource:create">新增根节点</IButton>
           </Modal>
           <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
              <IButton type="danger" disabled={!hasSelected} icon="delete" perm="resource:remove">删除</IButton>
           </Popconfirm>
           <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : ''}</span>
          </Col>
          <Col span={8} style={{float:'right'}} >
            <Search size="large" style={{width:300,float:'right'}} defaultValue={keyword} placeholder="输入权限名称或标识查询..." onSearch={value => onSearch(value)} />
          </Col>
        </Row>
      </div>
    )
  }

  const toolBar= (text, record, index) => (
    <div>
      <Modal record={{}} item={record} dispatch={dispatch} namespace={namespace} option='create' loading={loading} title="新增资源">
        <IButton perm="resource:remove" a>  新增 </IButton>
      </Modal>
      <Modal record={record} dispatch={dispatch} namespace={namespace} option='update' loading={loading} title="编辑资源">
        <IButton perm="resource:update" a> <span className="ant-divider" /> 编辑 </IButton>
      </Modal>
      <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({id:record.id_})}>
        <IButton perm="resource:remove" a> <span className="ant-divider" /> 删除 </IButton>
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
      scroll={{ y: table_height, x: 1530 }}
      bordered
      rowKey="id_"
      loading={fetching}
      title={() => title()}
    />
  )
}

export default WithList({pathname: 'sys/resource'})(List);
