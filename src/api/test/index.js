import request from '../../utils/request';

//根据活动id获取活动内容详情
export function uploada(data) {
    return request({
        url: '/file/planningUpload',
        method: 'post',
        data
    });
}

//根据审核人身份获取所有举报信息简表
export function getBriefInfoList(data) {
    return request({
        url: '/report/getBriefInfoList',
        method: 'get',
        params: data
    });
}


//判断是否显示消息页面
export function queryTag() {
    return request({
        url: '/report/queryTag',
        method: 'get'
    });
}
