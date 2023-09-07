import {
    login,
    // logout,
    getInfo
} from '@/api/user';
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth';

const getDefaultState = () => {
    return {
        token: getToken(),
        userInfo: {},
        role: ''
    };
};

const user = {
    namespaced: true,
    state: {
        token: getToken(),
        userInfo: {},
        role: ''
    },
    mutations: {
        RESET_STATE: (state) => {
            Object.assign(state, getDefaultState());
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_ROLE: (state, role) => {
            state.role = role;
        },
        SET_USER_INFO: (state, userInfo) => {
            console.log(userInfo)
            state.userInfo = userInfo;
        },
    },
    actions: {
        // 用户登录
        login({
            commit
        }, form) {
            let formData = new FormData();
            formData.append("studentNum", form.username);
            formData.append("password", form.password);
            return new Promise((resolve, reject) => {
                login(formData).then(res => {

                    const {
                        data
                    } = res;
                    commit('SET_TOKEN', data);
                    setToken(data);
                    console.log('token:', data)
                    resolve(res);
                }).catch(error => {
                    console.log('12111212')
                    reject(error);
                });
            });
        },
        // 获取用户信息
        getInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(res => {
                    const userInfo = res.data
                    localStorage.name = userInfo.studentName
                    localStorage.rollId = userInfo.adminInStuVO.rollId
                    localStorage.organizationId = userInfo.adminInStuVO.organizationId
                    localStorage.studentnum = userInfo.studentNum
                    localStorage.collegeId = userInfo.collegeId
                    // roll字段后端写错了 其实是role 表示用户角色（权限）
                    const {
                        rollTag
                    } = userInfo.adminInStuVO
                    commit('SET_ROLE', rollTag);
                    // const {
                    //     name,
                    //     avatar
                    // } = data;
                    commit('SET_USER_INFO', userInfo);
                    // resolve(res);
                    resolve(res)
                }).catch(error => {
                    reject(error);
                });
            });
        },
        resetToken({
            commit
        }) {
            return new Promise(resolve => {
                removeToken(); // must remove  token  first
                commit('RESET_STATE');
                resolve();
            });
        },
        resetUserInfo({
            commit
        }) {
            return new Promise(resolve => {
                commit('RESET_USERINFO');
                resolve();
            });
        }
    }
};
export default user;
