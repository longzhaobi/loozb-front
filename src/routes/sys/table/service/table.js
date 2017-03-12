import request from '../../../../utils/request';
import qs from 'qs';
export async function fetchTable(params) {
  return request({
    url:`/api/tables?${qs.stringify(params)}`
  });
}

export async function fetchColumn(params) {
  return request({
    url:`/api/tables/column?${qs.stringify(params)}`
  });
}
