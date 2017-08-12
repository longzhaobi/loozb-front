import React  from 'react';

//计算时间已过去多久组件
class HourMeter extends React.Component {
  constructor(props) {
    super(props);
    this.tickTime = this.tickTime.bind(this);
    this.state = {
      lastWitnessTime:null,
      text:null,
      time:null,
      second:60,
      status:'1'  //1还没有发送，2，已经发送，发送成功后设为1
    }
  }

  tickTime () {
    const nowTime = new Date();
    const dateMM = nowTime.getTime() - this.state.lastWitnessTime.getTime();

    if(Math.floor(dateMM/1000) <= 0) {
      //如果本机时间减去服务器返回的最后一次见证时间为负数，则直接返回0
      this.setState({
        text:'0'
      });
      return;
    }
    //计算出相差天数
    const days = Math.floor(dateMM/(24*3600*1000));
    //计算出小时数
    const leave1 = dateMM%(24*3600*1000)    //计算天数后剩余的毫秒数
    const hours = Math.floor(leave1/(3600*1000))
    //计算相差分钟数
    const leave2 = leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2/(60*1000))
    //计算相差秒数
    const leave3 = leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3/1000)

    const daysText  = days === 0 ? '' : `${days}天`;
    const hoursText = hours === 0 ? '' : `${hours}小时`;
    const minutesText = minutes === 0 ? '' : `${minutes}分`;
    const secondsText = seconds === 0 ? '' : `${seconds}秒`;

    const text = daysText + hoursText + minutesText + secondsText;
    this.setState({
      text,
      time:dateMM
    });
  }

  sendOption = () => {
    const {dispatch} = this.props;
    //每隔一秒判断一次，获得秒数
    const second = Math.floor(this.state.time/1000);
    if(second >= 1200) {
      dispatch({type:'witness/autoRecord'});
    }
  }

  componentWillMount() {
    const {lastWitnessTime} = this.props;
    if(lastWitnessTime) {
      this.setState({
        lastWitnessTime:lastWitnessTime
      });
    }
  }

  componentWillReceiveProps (nextProps) {
      const {lastWitnessTime} = nextProps;
      if(lastWitnessTime) {
        this.setState({
          lastWitnessTime:new Date(lastWitnessTime)
        });
      }
  }

  componentDidMount () {
    if(this.state.lastWitnessTime != null) {
      this.interval = setInterval(this.tickTime, 1000);
    }

    this.sendIntervar = setInterval(this.sendOption, 5000);
  }

  componentWillUnmount() {
     clearInterval(this.interval);
     clearInterval(this.sendIntervar);
  }

  render() {
    const {text} = this.state;
    return (
      <span style={{color:'red'}}>{this.state.text}</span>
    )
  }
}

export default HourMeter;
