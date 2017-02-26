import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`users?${qs.stringify(params)}`
  });
}
