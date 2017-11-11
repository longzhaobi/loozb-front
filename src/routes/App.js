import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Alert, notification, Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import Home from './home/Home';
import Layout from '../components/layout';
import styles from './App.css';
import TabController from '../components/ui/TabController';

import WithInit from '../hocs/WithInit';

const isTab = true;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    const _self = this;
    // msgSocket.on('receive_message', function (response) {
    //   const { data } = response;
    //   _self.setState({
    //     data
    //   });
    //   _self.openNotification();
    // });
  }
  close = () => {
    console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
  };
  openNotification = () => {
    const { data } = this.state;
    if (data == null) return;
    const key = `open${Date.now()}`;

    const btnClick = function () {
      // to hide notification box
      notification.close(key);
    };
    const btn = (
      <Button type="primary" size="small" onClick={btnClick}>
        确定
      </Button>
    );
    notification.open({
      message: `来自${data.fromUser}的消息`,
      description: data.message,
      btn,
      key,
      onClose: this.close,
    });
  };

  render() {
    const { children, routes } = this.props
    const route = routes[routes.length - 1]

    return (
      <Layout props={this.props}>
        {!isTab && <Breadcrumb routes={routes} />}
        {children != null ? isTab ? <TabController children={children} title={route.breadcrumbName} keys={route.path} /> : children : <Home />}
      </Layout>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(WithInit(App));
