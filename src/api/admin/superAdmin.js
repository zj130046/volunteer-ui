import request from '../../utils/request';

//--------------超级管理员--------------
// data 除formData外，传json即可

//通过学号查询基本信息
export function getStudentInfo(data) {
    return request({
        url: '/superAdmin/studentInfo',
        method: 'get',
        params: data
    });
}

//获取所有权限列表
export function getAuthorityList() {
    return request({
        url: '/superAdmin/authorityList',
        method: 'get'
    });
}

//获取总队总负责人列表
export function getGeneralAdmins(data) {
    return request({
        url: '/superAdmin/generalAdmins',
        method: 'get',
        params: data
    });
}

//删除总队总负责人
export function deleteAdmin(data) {
    return request({
        url: '/superAdmin/admin',
        method: 'delete',
        params: data
    });
}

//设立总队总负责人 formData
export function setAdmin(data) {
    return request({
        url: '/superAdmin/admin',
        method: 'post',
        data
    });
}

//获取职位列表
export function getRolls() {
    return request({
        url: '/superAdmin/rolls',
        method: 'get'
    });
}

//修改职位
export function editRoll(data) {
    return request({
        url: '/superAdmin/roll',
        method: 'put',
        data
    });
}

//设立新职位 formData
export function setNewRoll(data) {
    return request({
        url: '/superAdmin/newRoll',
        method: 'post',
        data
    });
}