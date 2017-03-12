import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Breadcrumb,Row, Col } from 'antd';
import TableList from './component/TableList';
import TableSelect from './component/TableSelect';

import styles from './Table.css';

const Table = ({location, dispatch, children, table, loading}) => {
  const namespace = 'table';
  const tableListProps = {
    ...table,
    namespace,
    dispatch,
    loading,
    namespace
  }

  const tableSelectProps = {
    ...table,
    loading,
    namespace,
    dispatch
  }

  return (
    <div className={styles.root}>
      <Row>
        <Col span={6}><TableSelect {...tableSelectProps}/></Col>
        <Col span={18}><TableList {...tableSelectProps}/></Col>
      </Row>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.table,
    table:state.table
  };
}

export default connect(mapStateToProps)(Table);
