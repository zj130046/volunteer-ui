import request from "../../utils/request"

//---------------公告系统-------------
// data 除formData外，传json即可

//查询公告
export function getAnnouncement(data) {
    return request({
        url: "/admin/announceSys/announcement",
        method: "get",
        params: data
    })
}

//修改公告 formData
export function editAnnouncement(data) {
    return request({
        url: "/admin/announceSys/announcement",
        method: "put",
        data
    })
}

//删除公告 formData
export function deleteAnnouncement(data) {
    return request({
        url: "/admin/announceSys/announcement",
        method: "delete",
        data
    })
}

//发布公告 json
export function publishAnnouncement(data) {
    return request({
        url: "/admin/announceSys/announcement",
        method: "post",
        data
    })
}