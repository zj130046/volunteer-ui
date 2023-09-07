export const creditMap = [
    // 信用分级
    {
        path: '/credit',
        visible: true,
        // redirect: '/event/planning',
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '信用分级',
            icon: 'iconfont vo-xinyong',
            keepAlive: false
        },
        children: [
            // 查看信誉等级
            {
                path: '/creditInfo',
                name: 'credit',
                meta: {
                    title: '信用查看',
                    icon: 'iconfont vo-jifenmingxi',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */ '@/views/credit/index.vue'
                    )
            },
            // 审核举报的页面
            {
                path: '/prove_report',
                name: 'report_prove',
                visible: false,
                meta: {
                    title: '审核举报',
                    keepAlive: false,
                    icon:'iconfont vo-shenhe'
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */ '@/views/credit/prove.vue'
                    )
            }
        ]
    },
    // 原先的审核界面
    // 现在将这个转换成为了一个二级菜单
    // {
    //     path: '/prove_report',
    //     visible: false,
    //     component: () => import('@/layout/layout.vue'),
    //     meta: {
    //         title: '举报消息',
    //         icon: 'iconfont vo-xinyong',
    //         keepAlive: false
    //     },
    //     children: [
    //         {
    //             path: '/',
    //             name: 'report_prove',
    //             visible: false,
    //             meta: {
    //                 title: '审核举报信息',
    //                 keepAlive: false
    //             },
    //             component: () =>
    //                 import(
    //                     /* webpackChunkName: "dashboard" */ '@/views/credit/prove.vue'
    //                 )
    //         }
    //     ]
    // }
    {
        path: '/credit_message',
        visible: false,
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '审核消息',
            icon: 'iconfont vo-xinyong',
            keepAlive: false
        },
        children: [
            {
                path: '/credit_message',
                name: 'credit_message',
                visible: false,
                meta: {
                    title: '总队审核消息',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */ '@/views/credit/message.vue'
                    )
            }
        ]
    }
];

