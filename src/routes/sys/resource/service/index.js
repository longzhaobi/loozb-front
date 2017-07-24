import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/api/resources?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/api/resources',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function update(params) {
  return request({
    url:`/api/resources`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/api/resources/${params}`,
    method:'delete'
  });
}

export async function fetchPermission() {
  return request({
    url:'/api/permissions/init'
  });
}
