import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import buildTimelineJSON from "./plugin/buildTimelineJSON.js";
import buildFriendLinksJSON from "./plugin/buildFriendLinksJSON.js";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        buildTimelineJSON(), // 构建时间轴json
        buildFriendLinksJSON(), // 构建友链json
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