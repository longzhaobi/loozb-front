import React, {PropTypes} from 'react';
import {connect} from 'dva';

import UIEditor from './component/UIEditor';
import styles from './Issue.css';

const Issue = ({location, dispatch, children, issue, loading}) => {
  const { article } = issue;
  const namespace = 'issue';
  console.log(Object.keys(article).length);
  const issueListProps = {
    ...issue,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <UIEditor { ...issueListProps } />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.issue,
    issue:state.issue
  };
}

export default connect(mapStateToProps)(Issue);
