require('es6-promise').polyfill();
import axios from 'axios';
import NProgress from 'nprogress'
import React from 'react';
import {Modal} from 'antd';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;

}
const myConfig = {withCredentials: true,baseURL:'http://localhost:8088/'};
// const baseURL = {baseURL:'http://localhost:8088/'};
// axios.defaults.baseURL = 'http://localhost:8088/';
export default function request(config = {}) {
  return axios.request(Object.assign(config,myConfig))
  .then(checkStatus)
  .catch((error) => {
    if(!error.response) {
      //假如未定义，说明获取后端网路失败
      Modal.error({
        title: '网络错误',
        content: '抱歉，获取网络失败，或者系统正在维护，请稍后再试'
      });
      return;
    }
    const {status, statusText,data,request} = error.response;
    if(status === 401) {
      Modal.error({
        title: '错误码：' + 401,
        content: data

      });

    } else if(status === 402) {
      const modal = Modal.warning({
        title: '登录已超时，请重新登录',
        content: '您的登录凭证已过期，请尝试重新登录后再操作！',
        onOk() {
          window.location.href = 'http://localhost:8000/#/login';
        },
        okText:'确定'
      });
    } else if(status === 404) {
      Modal.error({
        title: '请求地址无效',
        content: '请求地址:'+request.responseURL +' 没有被发现'
      });
    } else {
      Modal.error({
        title: '抱歉，系统发生了一个错误：' + status,
        content: <span dangerouslySetInnerHTML={{__html:data}}></span>
      });
    }
  });
}

//请求前和请求结束的拦截器
// axios.interceptors.request.use(function (config) {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
//
// axios.interceptors.response.use(function (response) {
//   NProgress.done()//结束进度条
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });
