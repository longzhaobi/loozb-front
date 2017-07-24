/**
* 自定义按钮BUTTON，用于统一权限控制，方便维护
*/
import React, {PropTypes} from 'react';

import {Button, Icon} from 'antd';

export default class IButton extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      visible: true
	    };
	}

	componentWillMount() {
		const {perm} = this.props;
		if(perm) {
			this.setState({
				visible:isAuth(perm)
			});
		}
	}

	render() {
		const {icon, disabled, children, type, a, onClick} = this.props;
		const {visible} = this.state;
		if(visible) {
			if(a) {
				if(onClick) {
					return <a onClick={onClick}>{children}</a>;
				} else {
					return <a>{children}</a>;
				}
				
			} else {
				return (
					<Button  onClick={onClick} type={type} icon={icon} size="large" style={{marginRight:'8px'}} disabled={disabled}>{children}</Button>
				);
			}
		} else {
			return null
		}
		
	}
}