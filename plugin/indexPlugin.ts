import fs from 'fs';
import path from 'path';
import generateMainConfig from './generateMainConfig';
import generateGossipConfig from './generateGossipConfig';
import generateFriendLinksConfig from './generateFriendLinksConfig';
import { loadYamlConfig } from './yamlConfigPlugin';

export const sourcePath = {
    source: '../../source',
    gossip: '../../source/gossip',
    friendLinks: '../../source/friendLink',
}

export const apiDirPath = {
    root: '../dist/api',
    rootDev: '../../public/api',

    friendLinks: '../dist/api/friendLinks',
    friendLinksDev: '../../public/api/friendLinks',

    gossip: '../dist/api/gossip',
    gossipDev: '../../public/api/gossip',
}

export const apiDir: { root: string; friendLinks: string; gossip: string; } = {
    root: path.resolve(__dirname, apiDirPath.root),
    friendLinks: path.resolve(__dirname, apiDirPath.friendLinks),
    gossip: path.resolve(__dirname, apiDirPath.gossip),
}

export const splitNum = 40;

function generateStaticFiles() {
    existsDir();
    const config = loadYamlConfig();
    generateMainConfig(config);
    generateFriendLinksConfig(config._friendLinks);
    generateGossipConfig(config._gossip);
}

function updateApiDir(mode: string) {
    apiDir.root = path.resolve(__dirname, mode === 'development' ? apiDirPath.rootDev : apiDirPath.root);
    apiDir.friendLinks = path.resolve(__dirname, mode === 'development' ? apiDirPath.friendLinksDev : apiDirPath.friendLinks);
    apiDir.gossip = path.resolve(__dirname, mode === 'development' ? apiDirPath.gossipDev : apiDirPath.gossip);
}

export default () => {
    return {
        name: 'vite-plugin-generate-json',

        config(config: unknown, env: { mode: string; }) {
            updateApiDir(env.mode);
            const apiPath = path.resolve(__dirname, apiDirPath.rootDev);

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

        configureServer(server: { watcher: { on: (arg0: string, arg1: (event: string, filePath: string) => void) => void; }; }) {
            const sourceDir = path.resolve(__dirname, sourcePath.source);
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
    dir = path.resolve(__dirname, dir);
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