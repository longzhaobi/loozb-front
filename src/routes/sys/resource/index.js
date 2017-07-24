import React, {PropTypes} from 'react';
import {connect} from 'dva';
import List from './component/List';
import WithRule from '../../../hocs/WithRule'
import styles from './index.css';

const Index = ({location, dispatch, children, resource, loading}) => {

  const namespace = 'resource';

  const ListProps = {
    ...resource,
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
    loading: state.loading.models.resource,
    resource:state.resource
  };
}

export default connect(mapStateToProps)(WithRule('resource:view')(Index));
