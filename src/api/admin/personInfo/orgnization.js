import request from "../../../utils/request"

// 删除学生组织
export function deleteOrganization(data) {
    return request({
        url: "/admin/memberInfo/organization",
        method: "delete",
        params: data
    })
}

// 添加学生组织
export function addOrganization(data) {
    return request({
        url: "/admin/memberInfo/organization",
        method: "post",
        data
    })
}

// 修改学生组织
export function editOrganization(data) {
    return request({
        url: "/admin/memberInfo/organization",
        method: "put",
        data
    })
}