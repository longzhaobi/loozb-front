import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/api/caches?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/api/caches',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function update(params) {
  return request({
    url:`/api/caches`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/api/caches/${params}`,
    method:'delete'
  });
}

export function removeCache(params) {
  return request({
    url:'/api/caches/removeCache',
    method:'post',
    data: qs.stringify(params)
  });
}

export function removeCurrentCache(params) {
  return request({
    url:'/api/caches/removeCurrentCache',
    method:'post',
    data: qs.stringify(params)
  });
}
