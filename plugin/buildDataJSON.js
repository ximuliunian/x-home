import fs from 'fs';
import path from 'path';
import {config} from '../config/Configuration';
import {friendLinks} from '../config/FriendLinks';
import {gossipConfig} from "../config/GossipConfiguration.js";

// API 生成目录
const apiDir = {
    // 根目录
    root: path.resolve(__dirname, '../dist/api'),
    // 友链
    friendLinks: path.resolve(__dirname, '../dist/api/friendLinks'),
    // 闲言碎语
    gossip: path.resolve(__dirname, '../dist/api/gossip'),
}

// 分裂阈值
const splitNum = 40;

export default () => {

    // 初始化
    function init() {
        // 确保输出目录存在
        existsDir();
    }

    return {
        name: 'vite-plugin-generate-json',
        closeBundle() {
            // 初始化
            init();

            // 构建主配置
            buildMainConfig();

            // 构建友链配置
            buildFriendLinksConfig();

            // 构建闲言碎语配置
            buildGossipConfig();
        }
    };
}

// 闲言碎语配置
function buildGossipConfig() {
    // 入口
    const main = [];

    findAndReadJsonFiles('../config/gossip/', object => {
        const info = object.info;

        // 跳过空ID
        if (info.id == null || info.id === '') return;

        main.push(info.id)

        // 完成版
        writeFile(apiDir.gossip, `${info.id}.json`, object)

        // 阉割版
        object.content = [...object.content.slice(0, 2), "p:......"]
        writeFile(apiDir.gossip, `${info.id}-cut.json`, object)
    })

    // xxxx.xx.xx-xx 类型排序
    function sort(list) {
        list.sort((a, b) => {
            const [dateA, numA] = a.split('-');
            const [dateB, numB] = b.split('-');

            // 将日期转换为 YYYYMMDD 格式以便比较
            const dateValueA = dateA.replace(/\./g, '');
            const dateValueB = dateB.replace(/\./g, '');

            // 比较日期
            if (dateValueA > dateValueB) return -1;
            if (dateValueA < dateValueB) return 1;

            // 如果日期相同，比较后面的数字
            return parseInt(numB) - parseInt(numA);
        });
    }

    sort(main)

    writeFile(apiDir.root, 'gossip.json', {...gossipConfig, list: main})
}

// 友链配置
function buildFriendLinksConfig() {
    // 获取友链配置所有分类
    const sorts = new Set(friendLinks.links.map(link => link.sort));

    // 查找并读取所有JSON文件
    const jsonFilesWithContent = [];
    findAndReadJsonFiles('../config/friendLink/', object => jsonFilesWithContent.push(object))

    // 分类
    const notSorted = [];
    const sorted = {};

    // 分组
    jsonFilesWithContent.forEach(json => {
        let sort = json.sorts;
        if (sort != null && sorts.has(sort)) {
            if (sorted[sort] == null) sorted[sort] = [];
            sorted[sort].push(json);
        } else {
            notSorted.push(json);
        }
        delete json.sorts;
    });

    // 入口
    const main = [];

    // 分割内容
    function splitList(array, fileName) {
        if (array.length > 0) {
            // 看看是否达到了分裂阈值
            if (array.length >= splitNum) {
                // 如果达到了阈值，那么对其分裂
                for (let i = 0; i < array.length; i += splitNum) {
                    let fn = `${fileName}-${i / splitNum}.json`;
                    console.log(array.slice(i, i + splitNum).length, array.length)
                    writeFile(apiDir.friendLinks, fn, array.slice(i, i + splitNum));
                    main.push(`${fileName}-${i / splitNum}`);
                }
            } else {
                writeFile(apiDir.friendLinks, `${fileName}.json`, array);
                main.push(fileName);
            }
        }
    }

    // 看看未分类的内容
    splitList(notSorted, 'notSorted');
    // 写入 JSON 文件
    Object.keys(sorted).forEach(key => splitList(sorted[key], key));
    // 写入入口文件
    writeFile(apiDir.root, 'friendLinks.json', main);
}

// 主目录配置
function buildMainConfig() {
    const mainConfig = {
        // 昵称
        name: config.name,
        // 头像
        avatar: config.avatar,
        // 介绍
        description: config.description,
        // 评论
        giscus: {
            repo: config.giscus.repo,
            repoId: config.giscus.repoId,
            category: config.giscus.category,
            categoryId: config.giscus.categoryId
        }
    };

    // 写入 JSON 文件
    writeFile(apiDir.root, 'main.json', mainConfig);
}

// 递归查找并读取 JSON 文件
function findAndReadJsonFiles(dir, fun) {
    // 获取需要查找的目录
    dir = path.resolve(__dirname, dir);
    const files = fs.readdirSync(dir);
    // 开始查找
    files.forEach(file => {
        const name = path.join(dir, file);
        const stats = fs.statSync(name);

        // 判断是否是目录
        if (stats.isDirectory()) {
            // 去下一层目录查找
            findAndReadJsonFiles(name, fun);
        } else if (path.extname(name).toLowerCase() === '.json') {
            try {
                // 读取JSON文件并转换成JS对象然后添加到数组中
                const data = fs.readFileSync(name, 'utf8');
                fun(JSON.parse(data))
            } catch (error) {
                console.error(`读取或解析错误 - ${name}:`, error.message);
            }
        }
    });
}

// 文件写入
function writeFile(outputDir, fileName, data) {
    const jsonFilePath = path.resolve(outputDir, fileName);
    console.log(`构建请求API: ${jsonFilePath}`); // 打印路径
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

// 确保输出目录存在
function existsDir() {
    // 遍历所有目录
    for (const key in apiDir) {
        const outputDir = apiDir[key];
        // 判断是否存在目录，不存在则创建
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, {recursive: true});
        }
    }
}