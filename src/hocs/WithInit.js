/**
* 高阶组件，初始化登录信息
*/
import React from 'react';
import request from '../utils/request';
import { Spin } from 'antd';
import io from 'socket.io-client';
import cookie from 'js-cookie';
const WithInit = (WrappedComponent) => {

	return class HOC extends React.Component {
		state = {
			loading: true,
		}

		componentDidMount() {
			const _self = this;
			this.props.dispatch({
				type: 'app/current', callback(response) {
					if (response) {
						const { hasPermissions, sysUser } = response;
						//设置权限信息到本地
						localStorage.setItem('has_permissions', hasPermissions);
						// const msgSocket = io('http://localhost:4001');
						// window.msgSocket = msgSocket;
						//建立socket.io连接
						//假设node服务器部署后的地址为：https://www.example.com/ws
						//则：ws_host='https://www.example.com'
						//const msgSocket = io(`${WS_HOST}`, {
						//  secure: true,
						// path: '/ws/socket.id'
						//})
						// msgSocket.on('connect', () => {
						// 	msgSocket.emit('user_login', {
						// 		userId: sysUser.id,
						// 		tokenId: cookie.get('loozb_token'),
						// 		socketId: msgSocket.id
						// 	})
						// });
					}
					_self.setState({
						loading: false
					});
				}
			})
			// msgSocket.on('receive_message', function (msg) {
			// 	console.log('Here is message we got in client:', msg);
			// });
		}


		render() {
			const { loading } = this.state;
			if (loading) {
				return (
					<Spin tip="初始化中，请稍后..." style={{ marginTop: '20%' }}>
						<div style={{ width: '100%', background: 'rgba(50,50,50, 0.1)' }}></div>
					</Spin>
				)
			}
			return (
				<WrappedComponent {...this.props} />
			)
		}
	}
}

export default WithInit;