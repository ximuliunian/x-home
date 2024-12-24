import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import buildTimelineJSON from "./plugin/buildTimelineJSON.js";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        buildTimelineJSON(), // 添加自定义插件
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 80,
        host: true, // 允许外部访问
    }
});