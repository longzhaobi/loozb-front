import React from 'react';

import classnames from 'classnames';
import mark from '../../utils/markdown';
import styles from './Rm.css';
class Rm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: '1'
        };
    }
    handleTextareaScroll = (e) => {
        if (this.state.flag !== '1') {
            this.setState({
                flag: '1'
            });
        }
        if (this.state.flag === '1') {
            this.htmlDom.scrollTop = this.textarea.scrollTop;
        }
    }

    handleDivScroll = (e) => {
        if (this.state.flag !== '2') {
            this.setState({
                flag: '2'
            });
        }
        if (this.state.flag === '2') {
            this.textarea.scrollTop = this.htmlDom.scrollTop;
        }
    }

    render() {
        const csl = classnames({
            [styles.htmlContent]: true,
            htmlContent: true
        });
        const { onChange, defaultValue } = this.props;
        return (
            <div className={styles.root}>
                <div className={styles.textAreaWithLines} ref={(linesDom) => this.linesDom = linesDom}>
                    <textarea onScroll={this.handleTextareaScroll} defaultValue={defaultValue} placeholder="博文正文..." ref={(textarea) => this.textarea = textarea} onChange={(e) => onChange(e.target.value)} spellCheck="false"></textarea>
                </div>
                <div onScroll={this.handleDivScroll} className={csl} ref={(htmlDom) => this.htmlDom = htmlDom} dangerouslySetInnerHTML={{ __html: mark.markdown(defaultValue) }}>
                </div>
            </div>
        )
    }
}

export default Rm;