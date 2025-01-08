import fs from 'fs';
import path from 'path';
import {friendLinks} from '../config/FriendLinks.js';

// 生成友链 JSON 静态文件
export default () => {
    // 输出目录
    const outputDir = path.resolve(__dirname, '../dist/api/friendLinks');

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

    // 递归查找并读取 JSON 文件
    function findAndReadJsonFiles(dir, arrayOfFiles = []) {
        dir = path.resolve(__dirname, dir);
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const name = path.join(dir, file);
            const stats = fs.statSync(name);

            // 判断是否是目录
            if (stats.isDirectory()) {
                // 去下一层目录查找
                arrayOfFiles = findAndReadJsonFiles(name, arrayOfFiles);
            } else if (path.extname(name).toLowerCase() === '.json') {
                try {
                    // 读取JSON文件并转换成JS对象然后添加到数组中
                    const data = fs.readFileSync(name, 'utf8');
                    const jsonData = JSON.parse(data);
                    arrayOfFiles.push(jsonData);
                } catch (error) {
                    console.error(`读取或解析错误 - ${name}:`, error.message);
                }
            }
        });

        return arrayOfFiles;
    }

    return {
        name: 'vite-plugin-generate-json',
        closeBundle() {
            // 初始化
            init();

            // 获取友链配置所有分类
            const sorts = new Set(friendLinks.links.map(link => link.sort));

            // 查找并读取所有JSON文件
            const jsonFilesWithContent = findAndReadJsonFiles('../config/friendLink/');

            // 分类
            const notSorted = [];
            const sorted = {};

            // 分组
            jsonFilesWithContent.forEach(json => {
                let sort = json.sorts;
                if (sort != null && sorts.has(sort)) {
                    if (sorted[sort] == null) {
                        sorted[sort] = [];
                    }
                    sorted[sort].push(json);
                } else {
                    notSorted.push(json);
                }
                delete json.sorts;
            });

            // 写入 JSON 文件
            Object.keys(sorted).forEach(key => writeFile(`${key}.json`, sorted[key]));
            if (notSorted.length > 0) writeFile('notSorted.json', notSorted);
        }
    };
};