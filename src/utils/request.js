require('es6-promise').polyfill();
import axios from 'axios';
import NProgress from 'nprogress'
import React from 'react';
import { Modal, message } from 'antd';

function checkStatus(response) {
  if (response.status === 200) {
    const { data } = response
    if (data && data.httpCode === 200) {
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

export default function request(config = {}) {
  return axios.request(Object.assign(config, { params: { key: new Date().getTime() } }))
    .then(checkStatus)
    .catch((error) => {
      if (!error.response) {
        //假如未定义，说明获取后端网路失败
        message.error("获取网络失败，请刷新浏览器试试")
        return;
      }
      const { status, data } = error.response;
      if (status === 207) {
        message.warning('频繁操作')
        return
      }
      const httpCode = data && data.httpCode
      if (status === 401 || httpCode === 401) {
        window.location.href = baseUrl + '/#/login';
        return;
      } else if(status === 504) {
        Modal.error({
          title: "错误提示",
          content: '抱歉，系统可能正在临时紧急维护，请稍后重试，或者联系系统运维人员'
        });
      } else if(status === 403 || httpCode === 403) {
        Modal.error({
          title: "权限提示",
          content: '抱歉，您没有此权限，如果您需要此权限，请联系系统管理员'
        });
      } else {
        if (data.msg) {
          if (data.uuid != null) {
            const msg = `错误编码(请把编码反馈给技术人员，谢谢！):<br/>${data.uuid}<br/>错误信息:<br/>${data.msg}`;
            Modal.error({
              title: "抱歉，系统发生了一个错误",
              content: <div dangerouslySetInnerHTML={{ __html: msg }}></div>
            });
          } else {
            Modal.error({
              title: "抱歉，系统发生了一个错误",
              content: <div dangerouslySetInnerHTML={{ __html: data.msg }}></div>
            });
          }
        } else {
          message.error("抱歉！系统内部出错");
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
