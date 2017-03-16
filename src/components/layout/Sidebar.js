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
    this.props.dispatch({
      type:'app/switchClick',
      payload:this.props.menuStyle === 'min' ? 'max' : 'min'
    })
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
      [styles.show]:menuStyle === 'max',
      [styles.hide]:menuStyle === 'min'
    })
    const getMenu = data => data.map((item) => {
      return (
        <Tooltip placement="right" title={menuStyle === 'max' ? '' : item.name} key={item.id_}>
          <span onClick={() => this.onSubBarClick(item.identity)} className={this.state.value === item.identity ? styles.isCurrent : styles.noCurrent}>
            <Link className={styles.item} to={item.url}>
              <span className={styles.icon}><Icon type={item.icon} /></span>
              <span className={linkCls}>{item.name}</span>
            </Link>
          </span>
        </Tooltip>
      )
    });
    return (
      <div className={cls}>
        <a className={styles.switchBar} onClick={() => this.switchClick()}>{menuStyle === 'max' ? <Icon type="menu-fold" /> : <Icon type="menu-unfold" />}</a>
        {getMenu(sortByWeight(menu, 'weight'))}
      </div>
    )
  }
}
