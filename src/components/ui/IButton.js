import React, {PropTypes} from 'react';

import {Button, Icon} from 'antd';

/**
* 自定义按钮BUTTON，用于统一权限控制，方便维护
*/
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
		// if(visible) {
			if(a) {
				if(onClick) {
					return <a href="javascript:void(0)" onClick={onClick} disabled={!visible}>{children}</a>;
				} else {
					return <a href="javascript:void(0)" disabled={!visible}>{children}</a>;
				}
				
			} else {
				return (
					<Button  onClick={onClick} type={type} icon={icon}  style={{marginRight:'8px'}} disabled={disabled || !visible}>{children}</Button>
				);
			}
		// } else {
		// 	return null
		// }
		
	}
}