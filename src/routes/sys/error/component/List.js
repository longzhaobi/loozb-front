import React, {PropTypes} from 'react';
import { routerRedux } from 'dva/router';

import {Table, Select, Input, Button, Row, Col, Popconfirm, Icon} from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import Modal from './Modal';
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
        <Popconfirm title="确定要删除吗？" onConfirm={() => removeHandler({id:record.id_})}>
          <IButton perm="role:remove" a> 删除 </IButton>
        </Popconfirm>
    </div>
  )

  return (
    <Table
      columns={columns(toolBar)}
      expandedRowRender={record => <p>{`错误信息：${record.exception}`}</p>}
      dataSource={data}
      pagination={false}
      rowSelection={rowSelection}
      size="middle"
      scroll={{ y: table_height, x: 2600 }}
      bordered
      rowKey="id_"
      loading={fetching}
      title={() => title()}
      footer={() => page()}
    />
  )
}

export default WithList({pathname: 'sys/errorinfo'})(List);
