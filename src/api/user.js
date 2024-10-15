import request from '@/utils/request';

export function login(data) {
    return request({
        url: '/login/web',
        method: 'post',
        data
    });
}

export function getInfo() {
    return request({
        url: '/enterPage/studentInfo',
        method: 'get'
    });
}

export function sendpassword() {
    return request({
        url: '/superAdmin/password',
        method: 'post'
    });
}
