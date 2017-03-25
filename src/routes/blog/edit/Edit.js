import React, {PropTypes} from 'react';
import {connect} from 'dva';

import UIEditor from './component/UIEditor';
import styles from './Edit.css';

const Edit = ({location, dispatch, children, edit, loading, article}) => {
  const namespace = 'edit';
  const editListProps = {
    ...edit,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <UIEditor { ...editListProps } />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.edit,
    edit:state.edit,
    article:state.article
  };
}

export default connect(mapStateToProps)(Edit);
