import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home/Index.vue')
        }, {
            path: '/comment',
            name: 'comment',
            component: () => import('../views/Comment.vue')
        }, {
            path: '/timeline',
            name: 'timeline',
            component: () => import('../views/Timeline.vue')
        }
    ]
})

export default router
