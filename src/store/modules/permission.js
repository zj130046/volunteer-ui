import { constantRouterMap } from '@/router';
// import {
//     superadminMap
// } from '@/router/routermap/superadminMap'
import { authenationMap } from '@/router/routermap/authencation';
import { authenationMap2 } from '@/router/routermap/authencation2';
import { planningMap } from '@/router/routermap/planning';
import { memorgnMap } from '@/router/routermap/mem_orgn';
import { memorgnMapcollege } from '@/router/routermap/mem_orgncollege';
import { memorgnMaporg } from '@/router/routermap/mem_orgnorg';
import { memorgnMapVolunteer } from '@/router/routermap/mem_volunteer';
import { announceMap } from '@/router/routermap/announce';
//lntest
import { creditMap } from '@/router/routermap/credit';
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
import router from '@/router/index';

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0);
    } else {
        return true;
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true;
        }
        return false;
    });
    return accessedRouters;
}

const permission = {
    namespaced: true,
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        generateRoutes({ commit }, data) {
            return new Promise(resolve => {
                console.log('data', data);
                const roles = data.role;

                let accessedRouters = [];
                for (let index = 0; index < roles.length; index++) {
                    //审核活动权限
                    if (roles[index] == 1) {
                        accessedRouters = accessedRouters.concat(planningMap);
                    } else if (roles[index] == 2) {
                        if (localStorage.getItem('rollId') == 3) {
                            accessedRouters = accessedRouters.concat(
                                authenationMap2
                            );
                        } else {
                            accessedRouters = accessedRouters.concat(
                                authenationMap
                            );
                        }
                    } else if (roles[index] == 3) {
                        //公告权限
                        accessedRouters = accessedRouters.concat(announceMap);
                    } else if (roles[index] == 4) {
                        //总队总负责人
                        if (localStorage.getItem('rollId') == 1) {
                            accessedRouters = accessedRouters.concat(
                                memorgnMap
                            );
                        } else if (localStorage.getItem('rollId') == 2) {
                            accessedRouters = accessedRouters.concat(
                                memorgnMapVolunteer
                            );
                        } else if (localStorage.getItem('rollId') == 4) {
                            //院队总负责人
                            accessedRouters = accessedRouters.concat(
                                memorgnMapcollege
                                //test
                            );
                        } else if (localStorage.getItem('rollId') == 8) {
                            accessedRouters = accessedRouters.concat(
                                memorgnMaporg
                            );
                        }
                    } else if (roles[index] == 5) {
                        //信用分级权限  目前只有院队总负责人和总队总负责人有
                        accessedRouters = accessedRouters.concat(creditMap);
                    }
                }
                commit('SET_ROUTERS', accessedRouters);
                // 手动循环加入routes
                accessedRouters.forEach((e, i) => {
                    router.options.routes.push(e);
                });
                resolve();
            });
        }
    }
};

export default permission;
