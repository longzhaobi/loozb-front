import React, { PropTypes, Component } from 'react';
import { Icon, Tooltip} from 'antd';
import classnames from 'classnames';
import {sortByWeight} from '../../utils/util';
import { Link} from 'dva/router';
import styles from './Sidebar.css';

export default class Sidebar extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.switchClick = this.switchClick.bind(this);
    this.onSubBarClick = this.onSubBarClick.bind(this);
    this.state = {
      value:''
    };
  }

  componentWillMount() {
    const {routes} = this.props;
    if(routes && routes.length > 1 && routes[1].path) {
      let value = routes[1].path.substring(1)
      this.onSubBarClick(value);
    }
  }

  switchClick() {
    if(this.props.menuStyle === 'min') {
      this.props.dispatch({
        type:'auth/switchClick',
        payload:'max'
      })
    } else {
      this.props.dispatch({
        type:'auth/switchClick',
        payload:'min'
      })
    }

  }
  onSubBarClick(value) {
    this.setState({
      value
    })
  }
  render() {
    const {location, dispatch, menuStyle, menu} = this.props;
    const cls = classnames({
      [styles.normal]:true,
      [styles.min]:menuStyle === 'min',
      [styles.max]:menuStyle === 'max'
    });
    const linkCls = classnames({
      [styles.item]:true
    })
    const getMenu = data => data.map((item) => {
      return (
        <Tooltip placement="right" title={item.name} key={item.id}>
        <span onClick={() => this.onSubBarClick(item.identity)} className={this.state.value === item.identity ? styles.isCurrent : styles.noCurrent}>
          <Link className={styles.item} to={item.url}>
            <span className={styles.icon}><Icon type={item.icon} /></span>
            <span className={styles.text}>{item.name}</span>
          </Link>
        </span>
        </Tooltip>
      )
    });
    return (
      <div className={cls}>


        <a className={styles.switchBar} onClick={() => this.switchClick()}>{menuStyle === 'max' ? <Icon type="menu-fold" /> : <Icon type="menu-unfold" />}</a>
        {getMenu(sortByWeight(menu, 'weight'))}
        {/* <Tooltip placement="right" title='系统管理'>
        <span onClick={() => this.onSubBarClick('sys')} className={this.state.value === 'sys' ? styles.isCurrent : styles.noCurrent}>
          <Link className={styles.item} to="/sys">
            <span className={styles.icon}><Icon type="setting" /></span>
            <span className={styles.text}>系统管理</span>
          </Link>
        </span>
        </Tooltip>
        <Tooltip placement="right" title='博文管理'>
          <span onClick={() => this.onSubBarClick('blog')} className={this.state.value === 'blog' ? styles.isCurrent : styles.noCurrent}>
            <Link className={styles.item} to="/blog">
              <span className={styles.icon}><Icon type="appstore-o" /></span>
              <span className={styles.text}>博文管理</span>
            </Link>
          </span>
        </Tooltip> */}
      </div>
    )
  }
}
