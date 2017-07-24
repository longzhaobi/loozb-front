import React, {PropTypes} from 'react';
import {connect} from 'dva';
import ResourceList from './component/ResourceList';
import WithRule from '../../../hocs/WithRule'
import styles from './Resource.css';

const Resource = ({location, dispatch, children, resource, loading}) => {

  const namespace = 'resource';

  const resourceListProps = {
    ...resource,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <ResourceList {...resourceListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.resource,
    resource:state.resource
  };
}

export default connect(mapStateToProps)(WithRule('resource:view')(Resource));
