import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';

import {Table, Select, Input, Button, Row, Col, Popconfirm, Icon} from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import Modal from './Modal';
import AuthModal from './AuthModal';
import styles from './List.css';

import columns from './columns';


import IButton from '../../../../components/ui/IButton';
import WithList from '../../../../hocs/WithList';

const List = ({data, loading, selectedRowKeys, dispatch, namespace, keyword, removeHandler, onSearch, onChange, page, rowSelection, fetching }) => {
  
  const hasSelected = selectedRowKeys.length > 0;

  function title() {
    return (
      <div>
        <Row>
          <Col span={16}>
           <Modal  record={{}} dispatch={dispatch} namespace={namespace} option='create' loading={loading} title="新增角色">
            <IButton type="primary" icon="plus" perm="role:create"> 新增 </IButton>
           </Modal>
           <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler(selectedRowKeys)}>
             <IButton type="danger" disabled={!hasSelected} perm="role:remove"  icon="delete">删除</IButton>
           </Popconfirm>
           <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 条数据` : ''}</span>
          </Col>
          <Col span={8} style={{float:'right'}} >
            <Search size="large" style={{width:300,float:'right'}} defaultValue={keyword} placeholder="输入任务名称查询..." onSearch={value => onSearch(value)} />
          </Col>
        </Row>
      </div>
    )
  }

  const toolBar= (text, record, index) => (
    <div>
        <AuthModal record={record} dispatch={dispatch} namespace={namespace} loading={loading}>
          <IButton perm="role:allot" a> 授权 </IButton>
        </AuthModal>
        
        <Modal record={record} dispatch={dispatch} namespace={namespace} option='update' loading={loading} title="编辑用户">
          <IButton perm="role:update" a> <span className="ant-divider" />编辑 </IButton>
        </Modal>
       
        <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({id:record.id_})}>
          <IButton perm="role:remove" a>  <span className="ant-divider" />删除 </IButton>
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
      rowKey="id_"
      loading={fetching}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default WithList({pathname: 'sys/role'})(List);
