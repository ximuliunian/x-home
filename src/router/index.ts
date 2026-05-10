/**
 * 路由配置模块
 * 定义应用的路由规则和导航守卫
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import config from 'virtual:yaml-config'

/**
 * 路由配置列表
 */
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Index.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/comments',
        name: 'comments',
        component: () => import('@/views/comment/Index.vue'),
        meta: { title: '留言板' }
    },
    {
        path: '/gossip',
        meta: { title: '闲言碎语' },
        children: [
            { path: '', name: 'gossip', component: () => import('@/views/gossip/Index.vue') },
            { path: 'info', name: 'gossipInfo', component: () => import('@/views/gossip/info/Index.vue') },
            { path: 'shield', name: 'gossipShield', component: () => import('@/views/gossip/shield/Index.vue') }
        ]
    },
    {
        path: '/friendLinks',
        name: 'friendLinks',
        component: () => import('@/views/friendLinks/Index.vue'),
        meta: { title: '友人帐' }
    },
]

/**
 * 创建路由实例
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

/**
 * 匿名路由列表（不需要权限验证的路由）
 */
const anonymousRoute = ['home']

/**
 * 全局前置守卫
 * 控制路由访问权限
 */
router.beforeEach((to, from, next) => {
    // 如果是匿名路由或配置允许访问，则放行
    const routeName = to.name as string;
    if (anonymousRoute.includes(routeName) || (config.enable.router as Record<string, boolean>)[routeName]) {
        document.title = import.meta.env.VITE_TITLE + ' - ' + to.meta.title
        next();
    } else {
        // 检查闲言碎语相关子路由
        const gossipNames = ['gossipInfo', 'gossipShield']
        if (gossipNames.includes(routeName) && config.enable.router.gossip) {
            next()
            return
        }

        // 其他情况跳转到首页
        document.title = import.meta.env.VITE_TITLE + ' - ' + to.meta.title
        next({ name: 'home' })
    }
})

export default router