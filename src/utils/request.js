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
const headers = {'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'};
const baseURL = {baseURL:'http://localhost:8088/'};

export default function request(config = {}) {
  return axios.request(Object.assign(config, headers, baseURL))
  .then(checkStatus)
  .catch((error) => {error});
}

// //请求前和请求结束的拦截器
// axios.interceptors.request.use(function (config) {
//   NProgress.start()
// 	NProgress.inc(0.2)
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
