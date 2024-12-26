import {createRouter, createWebHistory} from 'vue-router'

import {config} from '../../config/Configuration.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home/Index.vue')
        }, {
            path: '/comments',
            name: 'comments',
            component: () => import('../views/comment/Index.vue')
        }, {
            path: '/gossip',
            name: 'gossip',
            component: () => import('@/views/gossip/Index.vue')
        }, {
            path: '/friendLinks',
            name: 'friendLinks',
            component: () => import('@/views/friendLinks/Index.vue')
        },
    ]
})

// 匿名路由
const anonymousRoute = ['home']

router.beforeEach((to, from, next) => {
    // 如果去主页直接放行
    if (anonymousRoute.includes(to.name) || config.enable.router[to.name]) next();
    else next({name: 'home'})
})

export default router
