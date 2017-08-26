/**
* List组件统一高阶组件，用于将List公共方法全部统一到此处进行维护
*/
import React from 'react';
import { routerRedux } from 'dva/router';

import { message, Pagination } from 'antd';

const WithList = ({ pathname }) => {

	return function WithRuleFactory(WrappedComponent) {
		return class HOC extends React.Component {

			constructor(props) {
				super(props);
				this.dispatch = this.props.dispatch;
			}

			//公共移除方法
			removeHandler = (payload) => {
				const { namespace } = this.props;
				this.dispatch({
					type: `${namespace}/remove`,
					payload
				})
			}

			//公共搜索方法
			onSearch = (keyword) => {
				const { dispatch } = this.props;
				this.dispatch(routerRedux.push({
					pathname: pathname,
					query: { keyword },
				}));
			}

			//公共翻页功能
			onChange = (current, size) => {
				this.dispatch(routerRedux.push({
					pathname: pathname,
					query: { current, size },
				}));
			}

			//公共分页插件功能
			page = () => {
				const { current, total, size } = this.props;
				return (<Pagination
					total={total}
					current={current}
					pageSize={size}
					size="small"
					showTotal={total => `共 ${total}条记录 第${current}/${Math.ceil(total / size)}页`}
					showQuickJumper
					showSizeChanger
					onShowSizeChange={this.onChange}
					onChange={this.onChange}
				/>)
			}

			render() {
				const { selectedRowKeys, dispatch, namespace } = this.props;
				const rowSelection = {
					selectedRowKeys,
					onChange(selectedRowKeys) {
						dispatch({
							type: `${namespace}/onChangeSelectedRowKeys`,
							payload: selectedRowKeys
						});
					}
				}
				return (
					<WrappedComponent {...this.props} page={this.page} rowSelection={rowSelection} removeHandler={this.removeHandler} onSearch={this.onSearch} onChange={this.onChange} />
				)
			}
		}
	}
}

export default WithList;