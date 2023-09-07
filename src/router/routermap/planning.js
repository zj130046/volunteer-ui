export const planningMap = [
    // 活动策划
    {
        path: '/event',
        visible: true,
        // redirect: '/event/planning',
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '活动审核',
            icon: 'iconfont vo-shenhe_gaizhang',
            keepAlive: false
        },
        children: [{
            path: '/',
            name: 'planning',
            meta: {
                title: '活动审核',
                icon: 'iconfont vo-shenhe_gaizhang',
                keepAlive: false
            },
            component: () => import( /* webpackChunkName: "dashboard" */ '@/views/planning/index.vue')
        },]
    }, {
        path: "/activityPlanning",
        visible: false,
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '活动详情',
            keepAlive: true
        },
        children: [{
            path: '/activityPlanning',
            name: 'activityPlanning',
            meta: {
                title: '活动详情',
                keepAlive: false
            },
            component: () => import( /* webpackChunkName: "dashboard" */ '@/views/planning/detail.vue')
        },]
    },
]
