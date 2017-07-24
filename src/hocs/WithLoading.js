/**
* 高阶组件，验证组件权限信息
*/
import React from 'react';
import request from '../utils/request';
import {Spin} from 'antd';
const WithLoading = (BaseComponent) => {
	return class C extends React.Component {

		render() {
			const {loading} = this.props;
			if(loading) {
				return (
					<Spin tip="页面加载中，请稍后..." size="large">
					<div style={{height:'calc(100vh - 50px)',background:'rgba(50,50,50, 0.1)'}}></div>
					</Spin>
				)
			} else {
				return (
					<BaseComponent {...this.props}/>
				)
			}
		}
	}
}

export default WithLoading;
