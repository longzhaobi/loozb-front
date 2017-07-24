import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule'
import styles from './index.css';

const Index = ({location, dispatch, children, dic, loading}) => {

  const namespace = 'dic';

  const ListProps = {
    ...dic,
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
    loading: state.loading.models.dic,
    dic:state.dic
  };
}

export default connect(mapStateToProps)(WithRule('dic:view')(Index));
