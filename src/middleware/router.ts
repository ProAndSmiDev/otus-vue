import {createWebHistory, createRouter} from "vue-router"

import home from "../pages/home.vue"
import productPage from "../pages/products/[id].vue"
import {useAuth} from "../composables/useAuth";

const { isAuth } = useAuth()

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
        component: productPage,
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
            if (isAuth.value) {
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
