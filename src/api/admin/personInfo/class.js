import request from "../../../utils/request"

//删除学院
export function deleteCollege(data) {
  return request({
      url: "/admin/memberInfo/college",
      method: "delete",
      data
  })
}

//删除班级
export function deleteClass(data) {
  return request({
      url: "/admin/memberInfo/class",
      method: "delete",
      data
  })
}

// 添加学院
export function addCollege(data) {
  return request({
      url: "/admin/memberInfo/college",
      method: "post",
      data
  })
}

// 添加班级
export function addClass(data) {
  return request({
      url: "/admin/memberInfo/class",
      method: "post",
      data
  })
}