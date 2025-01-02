import {createRouter, createWebHistory} from 'vue-router'

import {config} from '../../config/Configuration.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home/Index.vue'),
            meta: {title: '首页'}
        }, {
            path: '/comments',
            name: 'comments',
            component: () => import('../views/comment/Index.vue'),
            meta: {title: '留言板'}
        }, {
            path: '/gossip',
            name: 'gossip',
            component: () => import('@/views/gossip/Index.vue'),
            meta: {title: '闲言碎语'}
        }, {
            path: '/friendLinks',
            name: 'friendLinks',
            component: () => import('@/views/friendLinks/Index.vue'),
            meta: {title: '友人帐'}
        },
    ]
})

// 匿名路由
const anonymousRoute = ['home']

router.beforeEach((to, from, next) => {
    // 如果去主页直接放行
    if (anonymousRoute.includes(to.name) || config.enable.router[to.name]) {
        document.title = import.meta.env.VITE_TITLE + ' - ' + to.meta.title
        next();
    } else {
        document.title = import.meta.env.VITE_TITLE + ' - ' + to.meta.title
        next({name: 'home'})
    }
})

export default router
