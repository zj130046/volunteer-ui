export const memorgnMapVolunteer = [
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
                name: 'volunteer',
                meta: {
                    title: '志愿者信息',
                    icon: 'iconfont vo-icon-',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */ '@/views/mem_orgn/volunteerInfo/index.vue'
                    )
            }
        ]
    }
];
