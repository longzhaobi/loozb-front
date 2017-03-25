import React, { Component } from 'react';
import { Row, Col, Button, Input } from 'antd';
import styles from './UIEditor.css';
import EditModal from './EditModal';
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

  componentWillReceiveProps(nextProps) {
    if(this.state.content === '' || this.state.title === '') {
      this.setState({
        content: nextProps.article.content,
        title: nextProps.article.title
      });
    }
  }

  handleChange (e){
    this.setState({content:e.target.value});
  }

  handleScroll (e) {
    this.htmlDom.scrollTop = this.textarea.scrollTop;
  }

  handleSave() {
    const { title, content } = this.state;
  }

  render() {
    const {article} = this.props;
    const record = this.state;
    return (
        <div className={styles.editor}>
          {
            Object.keys(article).length > 0 ? <div>
            <div className={styles.titlePanel}>
              <Row>
                <Col className="gutter-row" span={18}>
                  <Input ref={(input) => this.input = input } defaultValue={record.title} onChange={(e) => this.setState({title:e.target.value})} placeholder="文章标题..." className={styles.titleInput}/>
                </Col>
                <Col className="gutter-row" span={6} className={styles.option}>
                   <Button type="primary">预览</Button>
                   <EditModal  record={{...article, ...record}} dispatch={this.props.dispatch} namespace={this.props.namespace} option='create' loading={this.props.loading} title="新增权限">
                    <Button type="primary">提交</Button>
                   </EditModal>
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
          </div> : ''}
        </div>
      )
  }
}

export default UIEditor;
