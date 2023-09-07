import request from '../utils/request';

//-------------登录------------
// token 有效期 4 小时
// data 除formData外，传json即可

//上传活动策划
export function uploadPlanningFile(data) {
    return request({
        url: '/file/planningUpload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    });
}

//下载活动策划链接
export function downloadPlanningUrl(data) {
    return request({
        url: '/file/planningDownLoad',
        method: 'get',
        params: data
    });
}

//导出工时表
export function exportDialog(data) {
    return request({
        url: '/file/timetableDownload',
        method: 'get',
        params: data
    });
}

//上传提交活动总结
export function uploadForm(params, data) {
    return request({
        url: '/admin/activity/updateAcSummary',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: {
            activityId: params.activityid,
            activityContent: params.textcontent,
            photoContent: params.textpicture,
            month: params.monthly
        },
        data
    });
}

// 获取提交活动总结的内容
export function Showupload(data) {
    return request({
        url: '/admin/activity/getAcSummary',
        method: 'get',
        params: {
            activityId: data.activityid,
            month: data.monthly
        }
    });
}