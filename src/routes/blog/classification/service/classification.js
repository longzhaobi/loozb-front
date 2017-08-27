import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/api/anon/classifications?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/api/classifications',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function update(params) {
  return request({
    url:`/api/classifications`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/api/classifications/${params}`,
    method:'delete'
  });
}
