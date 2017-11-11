import React from 'react';

import { Icon, Avatar } from 'antd';
import classnames from 'classnames';

import styles from './MenuBar.css';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { switchStatus, onClick } = this.props;
        return (
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="large" />
                </div>
                <div className={switchStatus === 'message' ? styles.current : styles.noCurrent} onClick={() => onClick('message')}>
                    <Icon type="message" />
                </div>
                <div className={switchStatus === 'contact' ? styles.current : styles.noCurrent} onClick={() => onClick('contact')}>
                    <Icon type="team" />
                </div>
            </div>
        )
    }
}

export default MenuBar;