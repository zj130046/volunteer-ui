export const superadminMap = [
    //首页
    {
        path: '/',
        redirect: '/superadmin',
        name: 'index',
        visible: false,
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '首页',
            keepAlive: false
        }
    },
    // 活动策划
    {
        
        path: '/superadmin',
        visible: true,
        // redirect: '/event/planning',
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: 'superAdmin',
            icon: 'mdi-gauge',
            keepAlive: false
        },
        children: [{
            path: '/',
            name: 'superadmin',
            meta: {
                title: 'superAdmin',
                icon: 'mdi-gauge',
                keepAlive: false
            },
            component: () => import( /* webpackChunkName: "dashboard" */ '@/views/superAdmin/index.vue')
        }, ]
    },
]
