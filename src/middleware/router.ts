import {createWebHistory, createRouter} from "vue-router"

import home from "../pages/home.vue"
import products from "../pages/products/index.vue"
import productPage from "../pages/products/[id].vue"
import cart from "../pages/cart.vue"

const router = [
    { path: '/', component: home },
    { path: '/products', component: products },
    { path: '/products/:productId', component: productPage },
    { path: '/cart', component: cart },
]

export default createRouter({
    history: createWebHistory(),
    routes: router
})
