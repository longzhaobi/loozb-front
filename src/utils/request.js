require('es6-promise').polyfill();
import axios from 'axios';
import NProgress from 'nprogress'
import React from 'react';
import {Modal} from 'antd';
import cookie from 'js-cookie';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;

}
const myConfig = {
    withCredentials: true,
    // baseURL:'http://localhost:8088',
    baseURL:'http://139.129.226.66:8088'

  }
// const headers = {
//   'Content-Type': 'application/x-www-form-urlencoded',
//   'X-Requested-With': 'XMLHttpRequest'
// }
export default function request(config = {}) {
  return axios.request(Object.assign(config, myConfig))
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
        title: '抱歉您没有该权限',
        content: data
      });
      return;
    } else if(status === 402) {
      const modal = Modal.warning({
        title: '登录已超时，请重新登录',
        content: '您的登录凭证已过期，请尝试重新登录后再操作！',
        onOk() {
          window.location.href = 'http://www.csl.loozb.com/#/login';
        },
        okText:'确定'
      });
      return;
    } else if(status === 404) {
      Modal.error({
        title: '抱歉，请求地址无效',
        content: request.responseURL +' 在服务器未被注册'
      });
      return;
    } else {
      Modal.error({
        title: '未知错误，错误码：' + status,
        content: statusText
      });
    }
  });
}

//请求前和请求结束的拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
//
// axios.interceptors.response.use(function (response) {
//   NProgress.done()//结束进度条
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });
