import React, { Component } from 'react';
import { Row, Col, Button, Input } from 'antd';
import styles from './Editor.css';
import IssueModal from './IssueModal';
import Rm from '../../../../components/ui/Rm'
class UIEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      content: '',
      title: ''
    };
  }

  handleChange(e) {
    this.setState({ content: e.target.value });
  }

  handleScroll(e) {
    this.htmlDom.scrollTop = this.textarea.scrollTop;
  }

  handleSave() {
    const record = this.state;
  }

  render() {
    const record = this.state;
    return (
      <div className={styles.editor}>
        <div className={styles.titlePanel}>
          <Row>
            <Col className="gutter-row" span={18}>
              <input ref={(input) => this.input = input} defaultValue={record.title} onChange={(e) => this.setState({ title: e.target.value })} placeholder="文章标题..." className={styles.titleInput} />
            </Col>
            <Col className="gutter-row" span={6} className={styles.option}>
              <IssueModal record={record} dispatch={this.props.dispatch} namespace={this.props.namespace} option='create' loading={this.props.loading} title="新增权限">
                <Button type="primary" size="large"style={{height:40, width:100}}>提交</Button>
              </IssueModal>
            </Col>
          </Row>
        </div>
        <div className={styles.content}>
          <Rm onChange={(value) => this.setState({ content: value })} defaultValue={this.state.content}/>
        </div>
      </div>
    )
  }
}

export default UIEditor;
