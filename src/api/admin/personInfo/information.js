// 信息补全
import request from "../../../utils/request"

//获取各学院信息补全情况
export function collegeComplete() {
    return request({
        url: "/enterPage/collegeComplete",
        method: "get",
    })
}

//获取某学院各班级信息补全情况
export function classComplete(data) {
    return request({
        url: "/enterPage/classComplete",
        method: "get",
        params: data
    })
}