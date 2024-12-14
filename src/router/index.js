import {createRouter, createWebHistory} from 'vue-router'

import {config} from '../../Configuration.js'

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
            path: '/timeline',
            name: 'timeline',
            component: () => import('@/views/timeline/Index.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 如果去主页直接放行
    if (to.name === 'home' || config.enable.router[to.name]) next();
    else next({name: 'home'})
})

export default router
