export const authenationMap = [
    // 工时认证
    {
        path: '/authenation',
        visible: true,
        // redirect: '/event/planning',
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '活动工时认证',
            icon: 'iconfont vo-V',
            keepAlive: true
        },
        children: [{
            path: '/',
            name: 'authenation',
            meta: {
                title: '活动工时认证',
                icon: 'iconfont vo-V',
                keepAlive: true
            },
            component: () => import( /* webpackChunkName: "dashboard" */ '@/views/authentication/index.vue')
        }, ]
    },
    {
        path: '/volunteerInfo',
        visible: false,
        // redirect: '/event/planning',
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '工时信息',
            keepAlive: false
        },
        children: [{
            path: '/',
            name: 'volunteerInfo',
            meta: {
                title: '工时信息',
                keepAlive: false
            },
            component: () => import( /* webpackChunkName: "dashboard" */ '@/views/authentication/volunteerInfo.vue')
        }, ]
    },
];
