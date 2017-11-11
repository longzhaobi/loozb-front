import React, { Component } from 'react';
import { Form, Input, Modal, Button, message, Icon, Row, Col } from 'antd';

import Index from './'
import styles from './index.css';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataList:[]
        };
    }

    showModelHandler = (e) => {
        const { dispatch } = this.props;
        if (e) e.stopPropagation();
        dispatch({ type: 'chat/onlineUser' }).then((res) => {
            const { data } = res;
            this.setState({
                dataList: data,
                visible: true,
            });
        });
    };

    hideModelHandler = () => {
        this.setState({
            visible: false,
        });
    };

    okHandler = () => {

    };

    render() {
        const { children, title, loading, record } = this.props;

        return (
            <span>
                <span onClick={this.showModelHandler}>
                    {children}
                </span>
                <Modal
                    visible={this.state.visible}
                    width={1560}
                    footer={null}
                    maskClosable={false}
                    className={styles.modal}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                >
                    <div style={{ width: 1560, height: 750, position: 'relative' }}>
                        <Index dataList={this.state.dataList}/>
                    </div>
                </Modal>
            </span>
        );
    }
}

export default Chat;
