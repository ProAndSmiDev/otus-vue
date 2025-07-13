import { createApp, h, provide } from 'vue'
import App from './App.vue'
import "./style.css"

import { DefaultApolloClient } from '@vue/apollo-composable'
import {createPinia} from "pinia"

import client from './services/client.ts'
import router from '@routes/router.ts'

const pinia = createPinia()

const app = createApp({
    setup() {
        provide(DefaultApolloClient, client)
    },

    render: () => h(App),
})

app.use(pinia).use(router).mount('#app')

