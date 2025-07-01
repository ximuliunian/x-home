import './assets/main.css'
import './assets/iconfont.js'
import { config } from '../../source/Configuration.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide("config", config)

app.mount('#app')