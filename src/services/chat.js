import request from '../utils/request';
import qs from 'qs';

export function onlineUser(params) {
    return request({ 
        url:`/api/users/onlineUser?${qs.stringify(params)}`
    });
}