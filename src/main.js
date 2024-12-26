import './assets/main.css'
import {config} from '../config/Configuration.js'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide("config", config)

app.mount('#app')