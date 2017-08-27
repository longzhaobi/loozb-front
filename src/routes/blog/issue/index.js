import React, {PropTypes} from 'react';
import {connect} from 'dva';

import Editor from './component/Editor';
import styles from './index.css';

const Issue = ({location, dispatch, children, issue, loading}) => {
  const { article } = issue;
  const namespace = 'issue';
  const issueListProps = {
    ...issue,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <Editor { ...issueListProps } />
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
