import request from "../../../utils/request"

//-----------------管理员信息-------------
// data 除formData外传json即可

//通过学号搜索管理员
export function searchAdminNum(data) {
    return request({
        url: "/admin/memberInfo/studentNumAdmin",
        method: "get",
        params: data
    })
}

//通过名字搜索管理员
export function searchAdminName(data) {
    return request({
        url: "/admin/memberInfo/nameAdmin",
        method: "get",
        params: data
    })
}

//条件查询管理员列表
export function searchAdminCodition(data) {
    return request({
        url: "/admin/memberInfo/conditionAdmin",
        method: "get",
        params: data
    })
}

//查询管理员列表
export function searchAdminAll(data) {
    return request({
        url: "/admin/memberInfo/allAdmin",
        method: "get",
        params: data
    })
}

// 添加总队管理员
export function addAdminInGeneral(data) {
    return request({
        url: "/admin/memberInfo/adminInGeneral",
        method: "post",
        data
    })
}

// 删除总队管理员
export function deleteAdminInGeneral(data) {
    return request({
        url: "/admin/memberInfo/adminInGeneral",
        method: "delete",
        params: data
    })
}

// 添加院队管理员
export function addAdminInCollege(data) {
    return request({
        url: "/admin/memberInfo/adminInCollege",
        method: "post",
        data
    })
}

// 删除院队管理员
export function deleteAdminInCollege(data) {
    return request({
        url: "/admin/memberInfo/adminInCollege",
        method: "delete",
        params: data
    })
}

// 添加学生组织管理员
export function addAdminInOrganization(data) {
    return request({
        url: "/admin/memberInfo/adminInOrganization",
        method: "post",
        data
    })
}

// 删除学生组织管理员
export function deleteAdminInOrganization(data) {
    return request({
        url: "/admin/memberInfo/adminInOrganization",
        method: "delete",
        params: data
    })
}

// 修改管理员信息
export function editAdminInfo(data) {
    return request({
        url: "/admin/memberInfo/adminInfo",
        method: "put",
        params: data
    })
}

// 导出届别的信息
export function exportAdminInfo(data) {
    return request({
        url: "/admin/memberInfo/export",
        method: "post",
        data,
        responseType: 'blob',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
}