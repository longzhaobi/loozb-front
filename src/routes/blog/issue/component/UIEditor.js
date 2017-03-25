import React, { Component } from 'react';
import { Row, Col, Button, Input } from 'antd';
import styles from './UIEditor.css';
import IssueModal from './IssueModal';
import mark from '../../../../utils/markdown'
class UIEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      content:'',
      title:''
    };
  }

  handleChange (e){
    this.setState({content:e.target.value});
  }

  handleScroll (e) {
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
                  <Input ref={(input) => this.input = input } defaultValue={record.title} onChange={(e) => this.setState({title:e.target.value})} placeholder="文章标题..." className={styles.titleInput}/>
                </Col>
                <Col className="gutter-row" span={6} className={styles.option}>
                   <Button type="primary">预览</Button>
                   <IssueModal record={record} dispatch={this.props.dispatch} namespace={this.props.namespace} option='create' loading={this.props.loading} title="新增权限">
                    <Button type="primary">提交</Button>
                   </IssueModal>
                </Col>
              </Row>
            </div>
            <div className={styles.content}>
              <div className={styles.textAreaWithLines} ref={(linesDom) => this.linesDom = linesDom}>
                <textarea onScroll = {this.handleScroll} defaultValue={record.content} placeholder="博文正文..." ref={(textarea) => this.textarea = textarea} onChange={(e) => this.setState({content:e.target.value})} spellCheck="false"></textarea>
              </div>
              <div className={styles.htmlContent} ref={(htmlDom) => this.htmlDom = htmlDom} dangerouslySetInnerHTML={{__html:mark.markdown(this.state.content)}}>
              </div>
            </div>
        </div>
      )
  }
}

export default UIEditor;
