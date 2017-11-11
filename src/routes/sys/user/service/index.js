import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url: `/api/users?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url: '/api/users',
    method: 'post',
    data: qs.stringify(params)
  });
}

export async function update(params) {
  return request({
    url: `/api/users`,
    method: 'put',
    data: qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url: `/api/users/${params}`,
    method: 'delete'
  });
}

export async function fetchRoles() {
  return request({
    url: '/api/roles/all'
  });
}

export async function auth(id, params) {
  return request({
    url: `api/auths/allot/${id}`,
    method: 'post',
    data: qs.stringify(params)
  });
}

export async function judgeExist(params) {
  return request({
    url: `api/users/exist?${qs.stringify(params)}`
  });
}

export function sendMessage(params) {
  return request({
    url: 'socket/api',
    method: 'post',
    data: params
  });
}
