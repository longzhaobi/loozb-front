import React from 'react';

import { Input, Avatar } from 'antd';

const Search = Input.Search;

import styles from './ChatList.css';

function ChatList({ switchStatus, dataList, onSelect }) {
    return (
        <div className={styles.center}>
            <div className={styles.search}>
                <Search
                    placeholder="搜索最近联系人"
                    size="large"
                    onSearch={value => console.log(value)}
                />
            </div>
            <div className={styles.messageList}>
                {
                    dataList.map((d) => (
                        <div onClick={() => onSelect(d.id)} key={d.id}><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" width="30" height="30" /><span>{d.username}</span></div>
                    ))
                }
            </div>
        </div>
    )
}

export default ChatList;