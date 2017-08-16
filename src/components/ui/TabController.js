import React, { PropTypes } from 'react';
import { Tabs, Buttonm, Button, Icon, message } from 'antd';
const TabPane = Tabs.TabPane;

/**
* tab控制
*/
export default class TabController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: null,
			panes: []
		};
	}

	componentWillMount() {
		const { title, keys, children } = this.props;
		const panes = this.state.panes;
		const activeKey = keys;
		panes.push({ title: title, key: activeKey, component: children });
		this.setState({ panes, activeKey });
	}

	componentWillReceiveProps(nextProps) {
		const { title, keys, children } = nextProps;
		const panes = this.state.panes;
		const activeKey = keys;
		let isExist = false;
		for (let i = 0; i < panes.length; i++) {
			if (panes[i].key === activeKey) {
				isExist = true;
				break;
			}
		}

		if (isExist) {
			//如果已经存在
			this.setState({
				activeKey
			});
		} else {
			panes.push({ title, key: activeKey, component: children });
			this.setState({ panes, activeKey });
		}
	}

	onChange = (activeKey) => {
		this.setState({ activeKey });
	}

	onEdit = (targetKey, action) => {
		this[action](targetKey);
	}

	remove = (targetKey) => {
		if(this.state.panes.length === 1) {
			message.warning('窗口不能全部关闭');
			return;
		}
		let activeKey = this.state.activeKey;
		let lastIndex;
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key;
		}
		this.setState({ panes, activeKey });
	}

	render() {
		const { children } = this.props;
		return (
			<div>
				<Tabs
					hideAdd
					onChange={this.onChange}
					activeKey={this.state.activeKey}
					type="editable-card"
					onEdit={this.onEdit}
				>
					{this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.component}</TabPane>)}
				</Tabs>
			</div>
		)

	}
}