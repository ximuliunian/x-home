import './assets/main.css'
import {config} from '../Configuration.js'
import {configTimeline} from "../ConfigurationTimeline.js";

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide("config", config)
app.provide("configTimeline", configTimeline)

app.mount('#app')