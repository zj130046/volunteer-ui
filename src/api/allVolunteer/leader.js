import request from "../../utils/request"

//-------------活动负责人------------
// data 除formData外传json即可

//获取某工时表的驳回原因
export function getTimetableReason(data) {
    return request({
        url: "/volunteer/leader/timetableReason",
        method: "get",
        params: data
    })
}

//获取某活动的驳回原因
export function getActivityReason(data) {
    return request({
        url: '/volunteer/leader/activityReason',
        method: "get",
        params: data
    })
}

//根据工时表ID获取六位随机码
export function getRandomStringID(data) {
    return request({
        url: "/volunteer/leader/achIdString",
        method: "get",
        params: data
    })
}

//获取活动哪些日期已提交过
export function getDates(data) {
    return request({
        url: "/volunteer/leader/dates",
        method: "get",
        params: data
    })
}

//活动负责人获取工时表列表
export function getAllKindsTable(data) {
    return request({
        url: "/volunteer/leader/allKindsTable",
        method: "get",
        params: data
    })
}

//查看工时表详情
export function getTimetableInfo(data) {
    return request({
        url: "/volunteer/leader/timetableInfo",
        method: "get",
        params: data
    })
}

//确认工时认证表 formData
export function confirmTime(data) {
    return request({
        url: "/volunteer/leader/confirm",
        method: "post",
        data
    })
}

//增加工时表数据 
export function addTime(data) {
    return request({
        url: "/volunteer/leader/timeTable",
        method: "post",
        data
    })
}

//删除工时表数据 
export function deleteTime(data) {
    return request({
        url: "/volunteer/leader/timeTable",
        method: "delete",
        data
    })
}

//修改工时表数据 
export function editTime(data) {
    return request({
        url: "/volunteer/leader/timeTable",
        method: "put",
        data
    })
}

//生成六位随机码
export function getRandomString(data) {
    return request({
        url: "/volunteer/leader/randomString",
        method: "post",
        data
    })
}