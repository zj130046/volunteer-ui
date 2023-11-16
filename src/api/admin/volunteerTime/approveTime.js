import request from '../../../utils/request';

//--------------工时认证---------------------
// data 除 fromData 外传json即可

//驳回工时表 formData
export function rejectTimetable(data) {
    return request({
        url: '/admin/timetable/reject',
        method: 'put',
        params: data
    });
}

//认证工时表
export function passTimetable(data) {
    return request({
        url: '/admin/timetable/pass',
        method: 'put',
        params: data
    });
}
