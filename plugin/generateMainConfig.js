import { apiDir, writeFile } from "./indexPlugin";

// 构建主配置
export default (config) => {
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