import request from '@/utils/request';

//---------------首页接口--------------

//获取个人信息----token
export function getStudentInfo() {
    return request({
        url: '/enterPage/studentInfo',
        method: 'get'
    });
}

//获取首页公告
export function getAnnouncement() {
    return request({
        url: '/enterPage/announcement',
        method: 'get'
    });
}

//获取组织工时数据
export function getVolunteerDate() {
    return request({
        url: '/enterPage/volunteerDate',
        method: 'get'
    });
}

// 修改密码
export function changepassword(data) {
    return request({
        url: '/admin/memberInfo/newPassword',
        method: 'put',
        data
    });
}
