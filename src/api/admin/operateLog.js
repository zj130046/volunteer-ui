import request from "../../utils/request"

//-----------操作日志系统-------------
// data 除formData外，传json即可

//查询操作记录
export function getLogs(data) {
    return request({
        url: "/log/logs",
        method: "get",
        params: data
    })
}