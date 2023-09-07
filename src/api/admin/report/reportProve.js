import request from '../../../utils/request';

// 获取志愿者信用等级列表
export function getStuCreditInfo(data) {
    return request({
        url: '/stuPunished/query',
        method: 'get',
        params: data
    });
}

// 驳回举报
export function rejectReport(data) {
    return request({
        url: '/report/reject',
        method: 'put',
        params: data
    });
}

// 通过举报
export function proveReport(data) {
    return request({
        url: '/report/reportPassed',
        method: 'put',
        params: data
    });
}

// 获取举报信息列表
export function getReportList(data) {
    return request({
        url: '/report/getDetailInfoListBy',
        method: 'get',
        params: data
    });
}

// 根据简表获取详情表
export function getReportInfo(data) {
    return request({
        url: '/report/getDetailInfo',
        method: 'get',
        params: data
    });
}

// 撤回举报信息
export function deleteReport(data) {
    return request({
        url: '/report/backtracking',
        method: 'put',
        params: data
    });
}

//判断是否显示消息页面
export function queryTag() {
    return request({
        url: '/report/queryTag',
        method: 'get'
    });
}

//根据被举报人的学号得到对应他的所有举报详情表
export function getDetailInfoList(data) {
    return request({
        url: '/report/getDetailInfoList',
        method: 'get',
        params: data
    });
}


export function getDetailInfoListBy(data) {
    return request({
        url: '/report/getDetailInfoListBy',
        method: 'get',
        params: data
    });
}