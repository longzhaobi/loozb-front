import React, {PropTypes} from 'react';
import {connect} from 'dva';
import MsgTip from '../../../components/ui/MsgTip';
import ArticleList from './component/ArticleList';

import styles from './Article.css';

const Article = ({location, dispatch, children, article, loading}) => {

  const namespace = 'article';

  const articleListProps = {
    ...article,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <MsgTip />
      <ArticleList {...articleListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.article,
    article:state.article
  };
}

export default connect(mapStateToProps)(Article);
