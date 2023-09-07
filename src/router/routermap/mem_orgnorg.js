export const memorgnMaporg = [
    // 人员信息
    {
        path: '/mem_orgn',
        visible: true,
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '人员组织',
            icon: 'iconfont vo-qunzu',
            keepAlive: false
        },
        children: [
            {
                path: '/',
                name: 'admin',
                meta: {
                    title: '管理员信息',
                    icon: 'iconfont vo-guanliyuan',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */ '@/views/mem_orgn/adminInfo/index.vue'
                    )
            }
        ]
    }
];
