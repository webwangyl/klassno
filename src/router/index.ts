import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Welcome from '@/pages/welcome.vue'

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/',
        name: 'default',
        component: () => import('@/layouts/default.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/pages/home.vue')
            },
            {
                path: '/blog',
                name: 'blog',
                component: () => import('@/pages/blog.vue')
            },
            {
                path: '/theme',
                name: 'theme',
                component: () => import('@/pages/theme.vue')
            },
            {
                path: '/case',
                name: 'case',
                component: () => import('@/pages/case.vue')
            },
            {
                path: '/content',
                name: 'content',
                component: () => import('@/pages/content.vue')
            },
        ],
    },
    {
        path: '/sugar',
        name: 'sugar',
        component: () => import('@/pages/sugar.vue')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
