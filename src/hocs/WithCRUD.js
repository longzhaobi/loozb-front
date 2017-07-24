/**
* 增删改查高阶组件，用于将具有增删改查的组件统一封装
*/
import React from 'react';

const WithCRUD = (params) => {

	return function WithRuleFactory(WrappedComponent) {
		return class HOC extends React.Component {


			render() {
				return (
					<WrappedComponent {...this.props}/>
				)
			}
		}
	}
}

export default WithCRUD;