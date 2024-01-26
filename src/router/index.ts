import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Welcome from '@/pages/welcome.vue'

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/pages/test.vue')
    },
    {
        path: '/case',
        name: 'case',
        component: () => import('@/pages/case.vue')
    },
    {
        path: '/caseShow',
        name: 'caseShow',
        component: () => import('@/pages/caseShow.vue')
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
                path: '/content',
                name: 'content',
                component: () => import('@/pages/content.vue')
            },
            {
                path: '/collection',
                name: 'collection',
                component: () => import('@/pages/collection.vue')
            },
        ],
    },
    // {
    //     path: '/sugar',
    //     name: 'sugar',
    //     component: () => import('@/pages/sugar.vue')
    // },
    {
        path: '/three',
        name: 'three',
        component: () => import('@/pages/three/index.vue')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
