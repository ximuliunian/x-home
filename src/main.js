import './assets/main.css'
import {config} from '../Configuration.js'
import {configProjects} from "../ConfigurationProjects.js";

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide("config", config)
app.provide("configProjects", configProjects)

app.mount('#app')