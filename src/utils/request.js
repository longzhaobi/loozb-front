require('es6-promise').polyfill();
import axios from 'axios';
import NProgress from 'nprogress'
import React from 'react';
import {Modal, message} from 'antd';

function checkStatus(response) {
  if (response.status === 200) {
    const { data } = response
    if(data && (data.httpCode === 200 || data.httpCode === 403)) {
      return data;
    } else {
      const error = new Error(data ? data.msg : response.statusText);
      error.response = response;
      throw error;
    }
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

const params = {params: {key:new Date()}}

export default function request(config = {}) {
  return axios.request(Object.assign(config, {params: {key:new Date()}}))
  .then(checkStatus)
  .catch((error) => {
    if(!error.response) {
      //假如未定义，说明获取后端网路失败
      message.error("获取网络失败，请刷新浏览器试试")
      return;
    }
    const { status, data } = error.response;
    if(status === 207) {
      message.warning('频繁操作')
      return
    }
    const httpCode = data && data.httpCode
    if(status === 401 || httpCode === 401) {
      window.location.href = baseUrl + '/#/login';
      return;
    } else {
      if(data.msg) {
        message.error(data.msg);
      } else {
        message.error("抱歉！系统出错");
      }
      
      // return;
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
