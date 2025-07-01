import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import indexPlugin from './plugin/indexPlugin.js';


// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        publicDir: '../public',
        envDir: `${process.cwd()}/../`,
        plugins: [
            vue(),
            indexPlugin(), // 构建数据json
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
    }
});