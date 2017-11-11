import React, { PropTypes } from 'react';

import { Avatar, Icon, Input, Button } from 'antd';
import classnames from 'classnames';
const Search = Input.Search;

import MenuBar from './MenuBar';
import ChatList from './ChatList';
import ContentPanel from './ContentPanel';
import styles from './index.css';
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{ id:'1', time: '12:30', self: true }, { id: '2', time: '12:30', self: false }],
            switchStatus:'message'
        }
    }
    componentWillMount() {
        const record = localStorage.getItem('record');
        if(record) {
            var obj = JSON.parse(record);
        }
    }
    selectUser = (userId) => {
        alert(userId)
    }
    render() {
        const { switchStatus } = this.state;
        const { dataList = [] } = this.props;
        return (
            <div className={styles.normal}>
                <MenuBar switchStatus={switchStatus} onClick={(switchStatus) => this.setState({switchStatus})}/>
                <ChatList switchStatus={switchStatus} dataList={dataList} onSelect={(userId) => this.selectUser(userId)}/>
                <ContentPanel messages={this.state.messages}/>
            </div >
        )
    }
}
export default Chat;
