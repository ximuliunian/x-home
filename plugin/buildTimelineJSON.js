import fs from 'fs';
import path from 'path';
import {config} from "../config/Configuration.js";


// 生成时间轴 JSON 静态文件
export default () => {
    // 输出目录
    const outputDir = path.resolve(__dirname, '../dist/api');

    // 初始化
    function init() {
        // 确保输出目录存在
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, {recursive: true});
        }
    }

    // 文件写入
    function writeFile(filePath, content) {
        const jsonFilePath = path.resolve(outputDir, filePath);
        console.log(`构建请求API: ${jsonFilePath}`); // 打印路径
        fs.writeFileSync(jsonFilePath, JSON.stringify(content, null, 2), 'utf-8');
    }

    // 构建主配置
    function buildMainConfig() {
        const mainConfig = {
            // 昵称
            name: config.name,
            // 头像
            avatar: config.avatar,
            // 评论
            giscus: {
                repo: config.giscus.repo,
                repoId: config.giscus.repoId,
                category: config.giscus.category,
                categoryId: config.giscus.categoryId
            }
        };
        // 写入 JSON 文件
        writeFile('main.json', mainConfig);
    }

    return {
        name: 'vite-plugin-generate-json',
        closeBundle() {
            // 初始化
            init();

            // 构建主配置
            buildMainConfig();
        }
    };
};