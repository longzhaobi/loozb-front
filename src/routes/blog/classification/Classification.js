import React, {PropTypes} from 'react';
import {connect} from 'dva';
import ClassificationList from './component/ClassificationList';

import styles from './Classification.css';

const Classification = ({location, dispatch, children, classification, loading}) => {

  const namespace = 'classification';

  const classificationListProps = {
    ...classification,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <ClassificationList {...classificationListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.classification,
    classification:state.classification
  };
}

export default connect(mapStateToProps)(Classification);
