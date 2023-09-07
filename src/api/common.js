import request from '@/utils/request';

//--------------公共接口，不需要token-------------
// data 除formData外，传json即可
//获取届别列表
export function getAllLevel() {
    return request({
        url: '/common/allLevel',
        method: 'get'
    });
}

//根据届别或学院获取班级列表
export function getClassList(data) {
    return request({
        url: '/common/classList',
        method: 'get',
        params: data
    });
}

// 获取组织类别列表
export function getOrgnizationType() {
    return request({
        url: '/common/organizationCategory',
        method: 'get'
    });
}

//获取学院列表
export function getAllCollege() {
    return request({
        url: '/common/allCollege',
        method: 'get'
    });
}

//获取组织列表
export function getAllOrganization() {
    return request({
        url: '/common/allOrganization',
        method: 'get'
    });
}

//获取活动类别列表
export function getActivityCategoryList() {
    return request({
        url: '/common/activityCategoryList',
        method: 'get'
    });
}

//获取活动性质类别列表
export function getActivityKindList() {
    return request({
        url: '/common/characterCategory',
        method: 'get'
    });
}
