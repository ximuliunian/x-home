/**
 * Vite 构建配置文件
 * 配置项目的构建选项、插件、路径别名等
 */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import indexPlugin from './plugin/indexPlugin';
import yamlConfigPlugin from './plugin/yamlConfigPlugin';


/**
 * 导出 Vite 配置
 * @returns {import('vite').UserConfig} Vite 配置对象
 */
export default defineConfig(() => {
    return {
        // 静态资源目录
        publicDir: '../public',
        // 环境变量目录
        envDir: `${process.cwd()}/../`,
        // 插件列表
        plugins: [
            vue(),              // Vue 3 插件
            yamlConfigPlugin(), // YAML 配置加载插件
            indexPlugin(),      // 静态文件生成插件
        ],
        // 路径解析配置
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)) // 设置 @ 别名指向 src 目录
            }
        },
        // 开发服务器配置
        server: {
            port: 80,           // 开发服务器端口
            host: true,         // 允许外部访问
        }
    }
});