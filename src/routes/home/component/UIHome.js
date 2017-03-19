import React, {Component} from 'react';

import { Row, Col } from 'antd';

import styles from './UIHome.css';

const UIHome = (props) => {
  console.log(styles);
  return (
    <div className={styles.root}>
      <Row className={styles.row_1}>
        <Col span={12} className={styles.col_1_1}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
    </div>
  );
}

export default UIHome;
