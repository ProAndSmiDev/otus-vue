import {createWebHistory, createRouter} from "vue-router"

import home from "../pages/home.vue"

const router = [
    {
        path: '/',
        component: home
    },
    {
        path: '/products',
        component: () => import('../pages/products/index.vue') },
    {
        path: '/products/:productId',
        component: () => import('../pages/products/[id].vue'),
    },
    {
        path: '/cart',
        component: () => import('../pages/cart.vue') },
    {
        path: '/admin/products/add',
        component: () => import('../pages/admin/products/add.vue'),
        meta: {
            isAuthenticated: true
        },
        beforeEnter: (to, from, next) => {
            if (to.meta.isAuthenticated) {
                next()
            } else {
                next('/')
            }
        }
    },
]

export default createRouter({
    history: createWebHistory(),
    routes: router
})
