export const memorgnMapcollege = [
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
                path: '/volunteer',
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
            },

            {
                path: '/admin',
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
    },
    {
        path: '/modify_vol',
        visible: false,
        component: () => import('@/layout/layout.vue'),
        meta: {
            title: '人员组织',
            icon: 'iconfont ',
            keepAlive: false
        },
        children: [
            {
                path: '/vol_modify',
                name: 'vol_modify',
                visible: false,
                meta: {
                    title: '修改志愿者信息',
                    keepAlive: false
                },
                component: () =>
                    import(
                        /* webpackChunkName: "dashboard" */ '@/views/mem_orgn/volunteerInfo/modify.vue'
                    )
            }
        ]
    }
];
