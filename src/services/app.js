import request from '../utils/request';
import qs from 'qs';
export async function query() {
  return request('/api/users');
}

export function login(params) {
  return request({
    url:'/api/login',
    method: 'post',
    data: qs.stringify(params)
  });
}

export function register(params) {
  return request({
    url:'/api/register',
    method:'post',
    data:qs.stringify(params)
  });
}

export function logout() {
  return request({
    url:'/api/logout',
    method: 'post'
  });
}

export function current() {
  return request({
    url:'/api/users/current'
  });
}

export function verifyAuth(params) {
  return request({
    url:`/api/users/verifyAuth?${qs.stringify(params)}`
  });
}

export function fetchDics(params) {
  return request({
    url:`/api/dics/fetchDics?${qs.stringify(params)}`
  }); 
}

export async function updatePassword(params) {
  return request({
    url:`/api/users/updatePassword`,
    method:'put',
    data:qs.stringify(params)
  });
}
