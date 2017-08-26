import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule';
import styles from './index.css';

const Index = ({location, dispatch, children, cache, loading}) => {

  const namespace = 'cache';
  const ListProps = {
    ...cache,
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
    loading: state.loading.models.cache,
    cache:state.cache
  };
}

export default connect(mapStateToProps)(WithRule('cache:view')(Index));
