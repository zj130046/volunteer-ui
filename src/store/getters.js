const getters = {
    device: (state) => state.app.device,
    stuName: (state) => state.user.userInfo.studentName,
    token: (state) => state.user.token,
    addRouters: state => state.permission.addRouters,
    routers: state => state.permission.routers,
    originzationid: state => state.user.userInfo.adminInStuVO.organizationId,
    lastlogin: state=> state.user.userInfo.adminInStuVO.lastLogin,
    college: state=> [{collegeId:state.user.userInfo.collegeId,collegeName:state.user.userInfo.collegeName}],
    level: state=> state.user.userInfo.level
};
export default getters;
