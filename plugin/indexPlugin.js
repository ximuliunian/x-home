import { config } from '../../source/Configuration';
import { friendLinks } from '../../source/FriendLinks';
import { gossipConfig } from "../../source/GossipConfiguration";
import fs from 'fs';
import path from 'path';
import generateMainConfig from './generateMainConfig';
import generateGossipConfig from './generateGossipConfig';
import generateFriendLinksConfig from './generateFriendLinksConfig';

// 源文件路径
export const sourcePath = {
    source: '../../source', // 源文件根目录
    gossip: '../../source/gossip', // 闲言碎语配置文件目录
    friendLinks: '../../source/friendLink', // 友链配置文件目录
}

// 配置生成路径
export const apiDirPath = {
    root: '../dist/api',
    rootDev: '../../public/api',

    friendLinks: '../dist/api/friendLinks',
    friendLinksDev: '../../public/api/friendLinks',

    gossip: '../dist/api/gossip',
    gossipDev: '../../public/api/gossip',
}

// API 生成目录
export const apiDir = {
    // 根目录
    root: path.resolve(__dirname, apiDirPath.root),
    // 友链
    friendLinks: path.resolve(__dirname, apiDirPath.friendLinks),
    // 闲言碎语
    gossip: path.resolve(__dirname, apiDirPath.gossip),
}

// 分裂阈值
export const splitNum = 40;

// 生成静态文件的逻辑
function generateStaticFiles() {
    // 确保输出目录存在
    existsDir();

    // 构建主配置
    generateMainConfig(config);

    // 构建友链配置
    generateFriendLinksConfig(friendLinks);

    // 构建闲言碎语配置
    generateGossipConfig(gossipConfig);
}

// 更新 ApiDir 状态
function updateApiDir(mode) {
    apiDir.root = path.resolve(__dirname, mode === 'development' ? apiDirPath.rootDev : apiDirPath.root);
    apiDir.friendLinks = path.resolve(__dirname, mode === 'development' ? apiDirPath.friendLinksDev : apiDirPath.friendLinks);
    apiDir.gossip = path.resolve(__dirname, mode === 'development' ? apiDirPath.gossipDev : apiDirPath.gossip);
}

export default () => {
    return {
        name: 'vite-plugin-generate-json',

        // 配置阶段更新 ApiDir 状态
        config(config, env) {
            updateApiDir(env.mode);
            const apiPath = path.resolve(__dirname, apiDirPath.rootDev);

            // 仅在开发模式首次启动时生成
            if (env.mode === 'development' && !process.env.__VITE_INITIALIZED__) {
                if (fs.existsSync(apiPath)) {
                    fs.rmSync(apiPath, { recursive: true, force: true });
                }

                generateStaticFiles();
                process.env.__VITE_INITIALIZED__ = 'true';
            }

            // 打包阶段删除 apiDirPath.rootDev 目录
            if (env.mode === 'production') {
                if (fs.existsSync(apiPath)) {
                    fs.rmSync(apiPath, { recursive: true, force: true });
                }
            }
        },

        // 开发阶段监听文件变化并重新生成文件
        configureServer(server) {
            // 开发阶段监听文件变化并重新生成文件
            const sourceDir = path.resolve(__dirname, sourcePath.source);
            server.watcher.on('all', (event, filePath) => {
                if (filePath.startsWith(sourceDir) && filePath.endsWith('.json')) {
                    generateStaticFiles();
                }
            });
        },

        // 打包阶段生成静态文件
        closeBundle() {
            if (process.env.NODE_ENV === 'production') {
                generateStaticFiles();
            }
        }
    }
}

export const findAndReadJsonFilesType = {
    dir: "dir",
    file: "file",
    end: "end"
}

// 递归查找并读取 JSON 文件
export function findAndReadJsonFiles(dir, fun = (data, type, name) => { }) {

    // 获取需要查找的目录
    dir = path.resolve(__dirname, dir);
    const files = fs.readdirSync(dir);
    // 开始查找
    files.forEach(file => {
        const name = path.join(dir, file);
        const stats = fs.statSync(name);

        // 判断是否是目录
        if (stats.isDirectory()) {
            fun(null, findAndReadJsonFilesType.dir, name)
            // 去下一层目录查找
            findAndReadJsonFiles(name, fun);
        } else if (path.extname(name).toLowerCase() === '.json') {
            try {
                // 读取JSON文件并转换成JS对象然后添加到数组中
                const data = fs.readFileSync(name, 'utf8');
                fun(JSON.parse(data), findAndReadJsonFilesType.file, name)
            } catch (error) {
                console.error(`读取或解析错误 - ${name}:`, error.message);
            }
        }
    });

    // 结束本层目录查找
    fun(null, findAndReadJsonFilesType.end, dir)
}

// 文件写入
export function writeFile(outputDir, fileName, data) {
    const jsonFilePath = path.resolve(outputDir, fileName);
    console.log(`构建请求API: ${jsonFilePath}`); // 打印路径
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

// 确保输出目录存在
export function existsDir(dir) {
    let outputDir = dir ? { demo: dir } : apiDir;

    // 遍历所有目录
    Object.values(outputDir).forEach(outputDir => {
        // 判断是否存在目录，不存在则创建
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
    });
}