
// 提交或修改志愿者服务基地登记表

import request from "../../utils/request"

//---------------公共接口---------------
// data 除formData外传json即可

// 476937
//根据六位随机码获取活动信息
export function getActivityInfo(data) {
    return request({
        url: "/volunteer/public/timetableInfo",
        method: "get",
        params: data
    })
}

//根据活动id获取活动内容详情
export function getActivityContent(data) {
    return request({
        url: "/volunteer/public/activityContent",
        method: "get",
        params: data
    })
}

//获取自己提交的活动策划 json
export function getActivityPlanningList(data) {
    return request({
        url: "/volunteer/public/activityList",
        method: "get",
        params: data
    })
}

//获取所属组织
export function getOrganization() {
    return request({
        url: "/volunteer/public/organizationId",
        method: "get"
    })
}

//查询个人工时
export function searchVolunteerTime() {
    return request({
        url: "/volunteer/public/volunteerTime",
        method: "get"
    })
}

//提交工时信息 formData
export function pushTime(data) {
    return request({
        url: "/volunteer/public/time",
        method: "post",
        data
    })
}

//获取个人总工时数据
export function getSumTime() {
    return request({
        url: "/volunteer/public/sumTime",
        method: "get"
    })
}

// 获取某个活动的某项表
export function getactivityTable(data) {
    return request({
        url: "/volunteer/public/activityTable",
        method: "get",
        params: data
    })
}

// 提交活动基本信息
export function getActivityDraft(data) {
    return request({
        url: "/volunteer/public/activityDraft",
        method: "post",
        data
    })
}

//提交或修改活动策划
export function pushActivityPlanning(data) {
    return request({
        url: "/volunteer/public/activityPlanning",
        method: "post",
        data
    })
}

// 提交或修改志愿服务活动申请表
export function postApplication(data) {
    return request({
        url: "/volunteer/public/activityApplication",
        method: "post",
        data
    })
}

// 提交或修改志愿者服务基地登记表
export function activityBaseAgreement(data) {
    return request({
        url: "/volunteer/public/activityBaseAgreement",
        method: "post",
        data
    })
}

// 提交活动申请
export function complatePush(data) {
    return request({
        url: "/volunteer/public/activity",
        method: "post",
        data
    })
}

//获取某活动的详细信息
export function getActivityInfoTable(data) {
    return request({
        url: "/volunteer/public/activityInfo",
        method: "get",
        params: data
    })
}

//提交或修改保卫处场地审批表
export function postActivityLocation(data) {
    return request({
        url: "/volunteer/public/activityLocation",
        method: "post",
        data
    })
}

//提交或修改志愿服务长期项目登记表
export function postActivityLongTerm(data) {
    return request({
        url: "/volunteer/public/activityLongTerm",
        method: "post",
        data
    })
}

//提交或修改班级活动申请表
export function postActivityClass(data) {
    return request({
        url: "/volunteer/public/activityClass",
        method: "post",
        data
    })
}

// 草稿箱-获取活动列表
export function activityDraft (data) {
    return request({
        url: "/volunteer/public/activityDraft",
        method: "get",
        params:data
    })
}

// 提交或修改假期个人志愿活动申请表
export function postpersonal (data) {
    return request({
        url: "/volunteer/public/activityPersonal",
        method: "post",
        data
    })
}