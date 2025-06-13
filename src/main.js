import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import {createPinia} from "pinia"

import router from '@routes/router.ts'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
