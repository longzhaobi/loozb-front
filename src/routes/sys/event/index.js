import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule'
import styles from './index.css';

const Index = ({location, dispatch, children, event, loading, namespace}) => {

  const listProps = {
    ...event,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <List {...listProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.event,
    event:state.event,
    namespace: 'event'
  };
}

export default connect(mapStateToProps)(WithRule('event:view')(Index));
