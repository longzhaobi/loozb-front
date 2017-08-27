import React, { PropTypes } from 'react';
import { connect } from 'dva';
import List from './component/List';

import styles from './index.css';

const Article = ({ location, dispatch, children, article, loading }) => {

  const namespace = 'article';

  const listProps = {
    ...article,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <List {...listProps} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.article,
    article: state.article
  };
}

export default connect(mapStateToProps)(Article);
