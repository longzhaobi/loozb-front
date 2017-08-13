import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule'
import styles from './index.css';

const Index = ({location, dispatch, children, modifyInfo, loading}) => {

  const namespace = 'modifyInfo';
  const ListProps = {
    ...modifyInfo,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <List {...ListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.modifyInfo,
    modifyInfo:state.modifyInfo
  };
}

export default connect(mapStateToProps)(WithRule('modifyInfo:view')(Index));
