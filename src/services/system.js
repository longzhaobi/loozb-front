import request from '../utils/request';
import qs from 'qs';
export async function query() {
  return request('/api/users');
}

export async function login(params) {
  return request({
    url:'login',
    method: 'post',
    data: qs.stringify(params)
  });
}
