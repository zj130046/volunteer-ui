import request from '../../../utils/request';

//---------------活动信息--------------
// data 除formData外传json即可

//总队总负责人删除志愿活动
export function adminDeleteActivity(data) {
    return request({
        url: '/admin/activity/activityInfo',
        method: 'delete',
        data
    });
}

//管理员获取某个活动的详细信息 405
export function getActivityInfoAdmin(data) {
    return request({
        url: '/admin/activity/activityInfo',
        method: 'get',
        params: data
    });
}

//获取活动策划详情
export function getActivityContent(data) {
    return request({
        url: '/admin/activity/content',
        method: 'get',
        params: data
    });
}

//获取某个活动的详细信息
export function getActivityInfo(data) {
    return request({
        url: '/admin/activity/info',
        method: 'get',
        params: data
    });
}

//获取志愿活动列表
export function getActivityList(data) {
    return request({
        url: '/admin/activity/activityList',
        method: 'get',
        params: data
    });
}

//根据活动性质类别获取活动列表接口(新增)
export function getActivityKindList(data) {
    return request({
        url: '/admin/activity/acListByCharacter',
        method: 'get',
        params: data
    });
}

//根据活动id导出活动总结的word文档
export function exportSummary(data) {
    return request({
        url: '/file/exportWord',
        method: 'get',
        params: data,
        responseType: 'blob', // 重点 blob
    })
}