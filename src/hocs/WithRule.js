/**
* 高阶组件，验证组件权限信息
*/
import React from 'react';
import request from '../utils/request';
import {Spin} from 'antd';

const WithRule = (params) => {

	return function WithRuleFactory(WrappedComponent) {
		return class HOC extends React.Component {
			state = {
				isAuth: false,
				loading: true,
				isError:false
			}

			componentDidMount() {
				const _self = this;
				this.props.dispatch({type:'app/verifyAuth', payload: params, callback(data) {
					if(data) {
						if(data.httpCode === 200) {
							_self.setState({
								isAuth:true,
								loading:false
							});
						} else if(data.httpCode === 403 ){
							_self.setState({
								isAuth:false,
								loading:false
							});
						} else {
							_self.setState({
								loading:false,
								isError:true
							});
						}
					}
				}})
			}


			render() {
				const {isAuth,loading, isError} = this.state;
				if(loading) {
					return (
						<Spin tip="验证权限中" style={{marginTop:'20%'}}>
							<div style={{width:'100%',background:'rgba(50,50,50, 0.1)'}}></div>
						</Spin>
					)
				}
				if(!isAuth && !isError) {
					return (
						<div style={{width:'100%',textAlign:'center',paddingTop:100,}}><h2>抱歉，您无此权限</h2></div>
					)
				} else if(isError){
					return (
						<div style={{width:'100%'}}><h2>抱歉，页面出错拉！</h2></div>
					)
				}
				return (
					<WrappedComponent {...this.props}/>
				)
			}
		}
	}
}

export default WithRule;