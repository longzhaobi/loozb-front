import React from 'react';

import { Button } from 'antd';

import styles from './ContentPanel.css';

function ChatList({ messages }) {
    return (
        <div className={styles.content}>
            <div className={styles.contentHeader}>
                <h1>龙召碧</h1>
            </div>
            <div className={styles.contentCenter}>
                <ul>
                    {
                        messages.map((item) => (
                            <li key={item.id}>
                                <p className={styles.time}><span>12:30</span></p>
                                <div className={item.self ? styles.textLeft : styles.textRight}>
                                    <img className={styles.avatar} width="30" height="30" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <div className={styles.text}>我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={styles.contentInput} contentEditable="true">

            </div>
            <div className={styles.contentInputBtn}>
                <Button type="primary">发送</Button>
            </div>
        </div>
    )
}

export default ChatList;