import React, {PropTypes} from 'react';
import {connect} from 'dva';
import MsgTip from '../../../components/ui/MsgTip';
import ResourceList from './component/ResourceList';

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
      <MsgTip />
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

export default connect(mapStateToProps)(Resource);
