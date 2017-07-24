/**
* 高阶组件，初始化登录信息
*/
import React from 'react';
import request from '../utils/request';
import {Spin} from 'antd';

const WithInit = (WrappedComponent) => {

	return class HOC extends React.Component {
		state = {
			loading: true,
		}

		componentDidMount() {
			const _self = this;
			this.props.dispatch({type:'app/current', callback(response) {
				if(response) {
					const { hasMenus, hasPermissions, hasRoles} = response;
					//设置权限信息到本地
					localStorage.setItem('has_permissions', hasPermissions);
					//设置角色信息到本地
					localStorage.setItem('has_roles', hasRoles);
					//设置菜单信息到本地
					localStorage.setItem('has_menus', JSON.stringify(hasMenus));

					_self.props.dispatch({type:'app/getMenu'});

				}
				_self.setState({
					loading: false
				});
			}})
		}


		render() {
			const { loading } = this.state;
			if(loading) {
				return (
					<Spin tip="初始化中，请稍后..." style={{marginTop:'20%'}}>
						<div style={{width:'100%',background:'rgba(50,50,50, 0.1)'}}></div>
					</Spin>
				)
			}
			return (
				<WrappedComponent {...this.props}/>
			)
		}
	}
}

export default WithInit;