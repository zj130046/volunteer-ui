import request from "../../../utils/request"

//---------------活动审核--------------
// data 除formData外传json即可

//驳回活动策划 formData
export function rejectActivity(data) {
    return request({
        url: "/admin/activity/rejectActivity",
        method: "put",
        data
    })
}

//通过活动策划 formData
export function passActivity(data) {
    return request({
        url: "/admin/activity/passActivity",
        method: "put",
        data
    })
}
