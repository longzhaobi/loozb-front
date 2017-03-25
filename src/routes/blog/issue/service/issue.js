import request from '../../../../utils/request';
import qs from 'qs';

export async function fetch(id) {
  return request({
    url:`/api/anon/articles/${id}`
  });
}

export async function create(params) {
  return request({
    url:'/api/articles',
    method:'post',
    data:qs.stringify(params)
  });
}


export async function fetchClassifications() {
  return request({
    url:'/api/anon/all/classifications'
  });
}
