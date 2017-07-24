import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/api/permissions?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/api/permissions',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function update(params) {
  return request({
    url:`/api/permissions`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/api/permissions/${params}`,
    method:'delete'
  });
}

//获取资源和权限表头
export async function fetchResources() {
  return request({
    url:'/api/resources'
  });
}

export async function fetchColumns() {
  return request({
    url:'api/permissions/columns'
  });
}

//获取角色对于的资源所拥有的权限
export async function queryAuth(params) {
  return request({
    url:`api/resources/auth?${qs.stringify(params)}`
  });
}

//角色授权
export async function doAuth(params) {
  return request({
    url:'api/permissions/auth',
    method:'post',
    data:qs.stringify(params)
  });
}
