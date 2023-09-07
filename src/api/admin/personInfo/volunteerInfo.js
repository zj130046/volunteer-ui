import request from '../../../utils/request';

// 获取志愿者列表
export function searchmemberInfo(data) {
    return request({
        url: '/admin/memberInfo/volunteer',
        method: 'get',
        params: data
    });
}

// 修改志愿者的信息
export function changememberInfo(data) {
    return request({
        url: '/admin/memberInfo/volunteer',
        method: 'put',
        data
    });
}

// 删除志愿者信息
export function deletememberInfo(data) {
    return request({
        url: '/admin/memberInfo/volunteer',
        method: 'delete',
        data
    });
}

// 添加志愿者信息
export function addmemberInfo(data) {
    return request({
        url: '/admin/memberInfo/volunteer',
        method: 'post',
        data
    });
}

// 获取志愿者信用等级列表
export function getStuCreditInfo(data) {
    return request({
        url: 'admin/credit/getStuCreditInfo',
        method: 'get',
        params: data
    });
}
