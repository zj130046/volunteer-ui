import request from '../../../utils/request';

//--------------工时表信息---------------------
// data 除 fromData 外传json即可

//总队总负责人删除工时表
export function adminDeleteTimetable(data) {
    return request({
        url: '/admin/timetable/timetable',
        method: 'delete',
        data
    });
}

// 获取某志愿者的工时
export function getVolunteerTimetable(data) {
    return request({
        url: '/admin/timetable/volunteerTime',
        method: 'get',
        params: data
    });
}

//获取某张工时表的工时信息
export function getTimetableInfo(data) {
    return request({
        url: '/admin/timetable/timetableInfo',
        method: 'get',
        params: data
    });
}

//获取所有工时表
export function allKindsTable(data) {
    return request({
        url: '/admin/timetable/allKindsTable',
        method: 'get',
        params: data
    });
}

//批量删除工时表数据
export function deleteVolunteerTimes(data) {
    return request({
        url: '/admin/timetable/data',
        method: 'delete',
        data
    });
}

//添加一条数据
export function addOneData(data) {
    return request({
        url: '/admin/timetable/data',
        method: 'post',
        data
    });
}

// 批量导入
export function uploadFileData(data) {
    return request({
        url: '/admin/timetable/dataExcel',
        method: 'POST',
        data
    });
}

// 下载模板 excel
export function downloadExcel() {
    return request({
        url: '/admin/timetable/download',
        method: 'GET',
        responseType:'blob',
        headers: {
            'Content-Type': 'application/vnd.ms-excel;charset=utf-8'
        }
    });
}
