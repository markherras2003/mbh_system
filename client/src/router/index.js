import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/pages/joborders',
                    name: 'joborders',
                    component: () => import('@/views/pages/JobOrders.vue')
                },
                {
                    path: '/pages/permissions',
                    name: 'permissions',
                    component: () => import('@/views/pages/Permissions.vue')
                },
                {
                    path: '/pages/roles',
                    name: 'roles',
                    component: () => import('@/views/pages/Roles.vue')
                },
            ]
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/pages/Home.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
    ]
});

export default router;
