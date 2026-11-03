import fs from 'fs';
import path from 'path';
import generateMainConfig from './generateMainConfig';
import generateGossipConfig from './generateGossipConfig';
import generateFriendLinksConfig from './generateFriendLinksConfig';
import { loadYamlConfig } from './yamlConfigPlugin';

/**
 * 站点根目录相关路径
 * rootDir: 站点根目录（可能是上级目录，也可能是项目自身目录）
 * distDir: 构建输出目录
 * configPath: YAML 配置文件路径
 */
export interface RootPaths {
    rootDir: string;
    distDir: string;
    configPath: string;
}

// 数据源目录（由 initPaths 初始化）
export const sourcePath = {
    source: '',
    gossip: '',
    friendLinks: '',
}

// API 输出目录（由 initPaths 初始化）
export const apiDir: { root: string; friendLinks: string; gossip: string; } = {
    root: '',
    friendLinks: '',
    gossip: '',
}

export const splitNum = 40;

let yamlConfigPath = '';

/**
 * 根据根目录与构建模式初始化各类路径
 * @param paths - 站点根目录相关路径
 * @param mode - Vite 构建模式
 */
function initPaths(paths: RootPaths, mode: string) {
    const apiRoot = mode === 'development'
        ? path.join(paths.rootDir, 'public', 'api')
        : path.join(paths.distDir, 'api');

    sourcePath.source = path.join(paths.rootDir, 'source');
    sourcePath.gossip = path.join(sourcePath.source, 'gossip');
    sourcePath.friendLinks = path.join(sourcePath.source, 'friendLink');

    apiDir.root = apiRoot;
    apiDir.friendLinks = path.join(apiRoot, 'friendLinks');
    apiDir.gossip = path.join(apiRoot, 'gossip');
}

function generateStaticFiles() {
    existsDir();
    const config = loadYamlConfig(yamlConfigPath);
    generateMainConfig(config);
    generateFriendLinksConfig(config._friendLinks);
    generateGossipConfig(config._gossip);
}

export default (paths: RootPaths) => {
    yamlConfigPath = paths.configPath;

    return {
        name: 'vite-plugin-generate-json',

        config(config: unknown, env: { mode: string; }) {
            initPaths(paths, env.mode);
            // public 目录下的 api 数据在打包时会被重复生成，先清理掉
            const apiPath = path.join(paths.rootDir, 'public', 'api');

            if (env.mode === 'development' && !process.env.__VITE_INITIALIZED__) {
                if (fs.existsSync(apiPath)) {
                    fs.rmSync(apiPath, { recursive: true, force: true });
                }
                generateStaticFiles();
                process.env.__VITE_INITIALIZED__ = 'true';
            }

            if (env.mode === 'production') {
                if (fs.existsSync(apiPath)) {
                    fs.rmSync(apiPath, { recursive: true, force: true });
                }
            }
        },

        configureServer(server: { watcher: { on: (arg0: string, event: string, filePath: string) => void; }; }) {
            const sourceDir = path.join(paths.rootDir, 'source');
            server.watcher.on('all', (event, filePath) => {
                if (filePath.startsWith(sourceDir) && filePath.endsWith('.json')) {
                    generateStaticFiles();
                }
            });
        },

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

export function findAndReadJsonFiles(dir: string, fun: (data: unknown, type: string, name: string) => void = () => { }) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const name = path.join(dir, file);
        const stats = fs.statSync(name);

        if (stats.isDirectory()) {
            fun(null, findAndReadJsonFilesType.dir, name)
            findAndReadJsonFiles(name, fun);
        } else if (path.extname(name).toLowerCase() === '.json') {
            try {
                const data = fs.readFileSync(name, 'utf8');
                fun(JSON.parse(data), findAndReadJsonFilesType.file, name)
            } catch (error) {
                console.error(`读取或解析错误 - ${name}:`, error);
            }
        }
    });
    fun(null, findAndReadJsonFilesType.end, dir)
}

export function writeFile(outputDir: string, fileName: string, data: unknown) {
    const jsonFilePath = path.resolve(outputDir, fileName);
    console.log(`构建请求API: ${jsonFilePath}`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function existsDir(dir?: string) {
    let outputDir = dir ? { demo: dir } : apiDir;

    Object.values(outputDir).forEach((outputDir) => {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
    });
}
