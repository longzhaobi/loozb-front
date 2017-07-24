import React, {PropTypes} from 'react';
import {connect} from 'dva';
import DicList from './component/DicList';
import WithRule from '../../../hocs/WithRule'
import styles from './Dic.css';

const Dic = ({location, dispatch, children, dic, loading}) => {

  const namespace = 'dic';

  const dicListProps = {
    ...dic,
    dispatch,
    loading,
    namespace
  }

  return (
    <div className={styles.root}>
      <DicList {...dicListProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.dic,
    dic:state.dic
  };
}

export default connect(mapStateToProps)(WithRule('dic:view')(Dic));
