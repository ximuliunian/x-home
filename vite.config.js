import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import buildDataJSON from './plugin/buildDataJSON.js';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        buildDataJSON(), // 构建数据json
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