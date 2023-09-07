import request from '../../utils/request';

//---------------公共接口---------------
// data 除formData外传json即可

//管理员查询某个活动的内容的接口
export function getActivityInf_(data) {
    return request({
        url: '/admin/recruit/getContentById',
        method: 'get',
        params: data
    });
}


// 管理员进行模糊搜索活动名称
export function getActivity_(data) {
    return request({
        url: '/volunteer/leader/searchName',
        method: 'get',
        params: data
    });
}

// 管理员查询审核通过的志愿招募信息接口
export function getPassActivity(data) {
    return request({
        url: '/admin/recruit/activityList',
        method: 'get',
        params: data
    });
}

// 管理员查询某个活动的内容的接口
// export function getPassActivityInfo(data) {
//     return request({
//         url: '/admin/recruit/getContentById',
//         method: 'get',
//         params: data
//     });
// }

// 管理员确认申请查询活动内容接口
// export function getPassActivityForm(data) {
//     return request({
//         url: '/admin/recruit/getAcInfoById',
//         method: 'get',
//         params: data
//     });
// }

// 管理员查看参加某个活动的志愿者信息接口
export function getVolunteerInfo(data) {
    return request({
        url: '/admin/recruit/getVolunteerInfo',
        method: 'get',
        params: data
    });
}

//管理员上交招募活动申请表
export function uploadPassActivityForm(data) {
    return request({
        url: '/admin/recruit/putRecruitApply',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data;'
        },
        data
    });
}

// 管理员查询招募通过的志愿招募信息接口
export function getRecruitInfo(data) {
    return request({
        url: '/recruit/list',
        method: 'get',
        params: data
    });
}