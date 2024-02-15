import Vue from 'vue';
import Router from 'vue-router';

import layout from '@/layout/layout.vue';
// import treeRoute from '@/views/layout/router.vue';

Vue.use(Router);

export const constantRouterMap = [
    //首页
    {
        path: '/',
        redirect: '/dashboard',
        name: 'index',
        visible: false,
        component: layout,
        meta: {
            title: '首页',
            keepAlive: false
        }
    },
    // 首页
    {
        path: '/dashboard',
        visible: true,
        component: layout,
        meta: {
            title: '首页',
            icon: 'iconfont vo-1',
            keepAlive: false
        },
        children: [
            {
                path: '/',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'iconfont vo-1',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/home/index'
                    )
            }
        ]
    },

    // 志愿活动
    {
        path: '/activity',
        visible: true,
        component: layout,
        meta: {
            title: '本组织',
            icon: 'iconfont vo-zhiyuanmonitianbao',
            keepAlive: false
        },
        children: [
            {
                path: '/apply',
                name: 'apply',
                meta: {
                    title: '申请活动',
                    icon: 'iconfont vo-shenqing2',
                    keepAlive: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/activity/apply/index.vue'
                    )
            },
            {
                path: '/prove',
                name: 'prove',
                meta: {
                    title: '提交工时',
                    icon: 'iconfont vo-shenhe12',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/activity/prove/index.vue'
                    )
            }
        ]
    },
    {
        path: '/askFor',
        visible: false,
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '填写申请表',
            keepAlive: false
        },
        children: [
            {
                path: '/askFor',
                name: 'askFor',
                meta: {
                    title: '填写申请表',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/activity/apply/askFor/index.vue'
                    )
            }
        ]
    },
    {
        path: '/askForActivity',
        visible: false,
        component: layout,
        meta: {
            title: '申请活动',
            keepAlive: false
        },
        children: [
            {
                path: '/askForActivity',
                name: 'askForActivity',
                meta: {
                    title: '申请活动',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/activity/apply/askForActivity'
                    )
            }
        ]
    },
    {
        path: '/drafts',
        visible: false,
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '草稿箱',
            keepAlive: false
        },
        children: [
            {
                path: '/drafts',
                name: 'drafts',
                meta: {
                    title: '草稿箱',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '../views/activity/apply/drafts/index.vue'
                    )
            }
        ]
    },
    {
        path: '/random',
        visible: false,
        component: layout,
        meta: {
            title: '生成工时表',
            keepAlive: false
        },
        children: [
            {
                path: '/random',
                name: 'random',
                meta: {
                    title: '生成工时表',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/activity/apply/random'
                    )
            }
        ]
    },
    {
        path: '/timetable',
        visible: false,
        component: layout,
        meta: {
            title: '工时表详情',
            icon: 'mdi-gauge',
            keepAlive: true
        },
        children: [
            {
                path: '/timetable',
                name: 'timetable',
                meta: {
                    title: '工时表详情',
                    icon: 'mdi-gauge',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/activity/apply/timetable'
                    )
            }
        ]
    },
    {
        path: '/volunteerTime',
        visible: false,
        component: layout,
        meta: {
            title: '工时信息',
            keepAlive: false
        },
        children: [
            {
                path: '/volunteerTime',
                name: 'volunteerTime',
                meta: {
                    title: '工时信息',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/activity/apply/volunteerTime'
                    )
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        visible: false,
        meta: {
            title: '领航工作室',
            keepAlive: false
        },
        component: () =>
            import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
        path: '/operationLog',
        visible: true,
        component: layout,
        meta: {
            title: '操作日志',
            icon: 'iconfont vo-rizhi',
            keepAlive: false
        },
        children: [
            {
                path: '/',
                name: 'operationLog',
                meta: {
                    title: '操作日志',
                    icon: 'iconfont vo-rizhi',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/operationLog/index.vue'
                    )
            }
        ]
    },
    // 修 改 密码
    {
        path: '/changepassword',
        visible: false,
        component: layout,
        meta: {
            title: '修改密码',
            keepAlive: false
        },
        children: [
            {
                path: '/changepassword',
                name: 'changepassword',
                meta: {
                    title: '修改密码',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/login/changepassword.vue'
                    )
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        visible: false,
        component: () =>
            import(
                /* webpackChunkName: "404page" */
                '@/views/exception-page/404.vue'
            ),
        meta: {
            title: '404',
            keepAlive: false
        }
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/superadmin',
        visible: false,
        // component: layout,
        meta: {
            title: 'superAdmin',
            icon: 'mdi-gauge',
            keepAlive: false
        },
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */
                '../views/superAdmin/index.vue'
            )
    },
    //信息补全页面 之后不需要
    {
        path: '/information',
        visible: true,
        component: layout,
        meta: {
            title: '信息补全',
            icon: 'iconfont vo-rizhi',
            keepAlive: false
        },
        children: [
            {
                path: '/',
                name: 'information',
                meta: {
                    title: '信息补全',
                    icon: 'iconfont vo-rizhi',
                    keepAlive: false
                },
                component: () =>
                    import('../views/mem_orgn/information/index.vue')
            }
        ]
    },
    //志愿者招募（新增）
    {
        path: '/recruitment',
        visible: true,
        component: layout,
        meta: {
            title: '志愿者招募',
            icon: 'iconfont vo-recruitment',
            keepAlive: false
        },
        children: [
            {
                path: '/',
                name: 'recruitment',
                meta: {
                    title: '志愿者招募',
                    icon: 'iconfont vo-recruitment',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/recruitment/index.vue'
                    )
            }
        ]
    }, //申请页面（新增）
    {
        path: '/askForVolunteer',
        visible: false,
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '申请页面',
            keepAlive: false
        },
        children: [
            {
                path: '/askForVolunteer',
                name: 'askForVolunteer',
                meta: {
                    title: '申请页面',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/recruitment/askForVolunteer/index'
                    )
            }
        ]
    }, //申请表单（新增）
    {
        path: '/askForV',
        visible: false,
        component: layout,
        meta: {
            title: '志愿者招募',
            icon: 'mdi-gauge',
            keepAlive: false
        },
        children: [
            {
                path: '/askForV',
                name: 'askForV',
                meta: {
                    title: '志愿者招募',
                    icon: 'mdi-gauge',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/recruitment/askForVolunteer/askForV/askForm'
                    )
            }
        ]
    }, // 志愿者信息（新增）
    {
        path: '/VolunteerInfo',
        visible: false,
        component: layout,
        meta: {
            title: '志愿者信息',
            icon: 'mdi-gauge',
            keepAlive: false
        },
        children: [
            {
                path: '/VolunteerInfo',
                name: 'VolunteerInfo',
                meta: {
                    title: '志愿者信息',
                    icon: 'mdi-gauge',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */
                        '@/views/recruitment/VolunteerInfo/index'
                    )
            }
        ]
    }
];
export default new Router({
    mode: 'history', //后端支持可开
    // base: '/wustvolunteer/',
    base: './',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
});
