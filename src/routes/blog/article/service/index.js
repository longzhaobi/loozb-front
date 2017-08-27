import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/api/articles?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/api/articles',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function confirm(id) {
  return request({
    url:`/api/articles/confirm/${id}`,
    method:'put'
  });
}

export async function update(params) {
  return request({
    url:`/api/articles`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/api/articles/${params}`,
    method:'delete'
  });
}

export async function queryById(id) {
  return request({
    url:`/api/anon/articles/${id}`
  });
}

export async function topHandler(id) {
  return request({
    url:`/api/top/articles/${id}`,
    method:'put'
  });
}
