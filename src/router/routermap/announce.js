export const announceMap = [
    // 工时认证
    {
        path: '/announce',
        visible: true,
        // redirect: '/event/planning',
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '公告',
            icon: 'iconfont vo-gonggao',
            keepAlive: false
        },
        children: [{
            path: '/',
            name: 'announce',
            meta: {
                title: '公告',
                icon: 'iconfont vo-gonggao',
                keepAlive: false
            },
            component: () => import( /* webpackChunkName: "dashboard" */ '@/views/announce/index.vue')
        }, ]
    },
]
