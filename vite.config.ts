/**
 * Vite 构建配置文件
 * 配置项目的构建选项、插件、路径别名等
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import indexPlugin from './plugin/indexPlugin';
import yamlConfigPlugin from './plugin/yamlConfigPlugin';

// 项目自身目录
const projectDir = fileURLToPath(new URL('.', import.meta.url));
// 上级目录
const parentDir = path.resolve(projectDir, '..');
// 上级目录存在 source/config.yml 时优先作为站点根目录，否则使用项目自身目录
const rootDir = fs.existsSync(path.join(parentDir, 'source', 'config.yml')) ? parentDir : projectDir;

// 站点相关路径（均基于最终的根目录）
const configPath = path.join(rootDir, 'source', 'config.yml');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(projectDir, 'dist');

/**
 * 导出 Vite 配置
 * @returns {import('vite').UserConfig} Vite 配置对象
 */
export default defineConfig(() => {
    return {
        // 静态资源目录（优先上级目录的 public）
        publicDir,
        // 环境变量目录（优先上级目录的 .env）
        envDir: rootDir,
        // 插件列表
        plugins: [
            vue(),              // Vue 3 插件
            yamlConfigPlugin(configPath), // YAML 配置加载插件
            indexPlugin({ rootDir, distDir, configPath }), // 静态文件生成插件
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
