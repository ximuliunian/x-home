import { apiDir, writeFile } from "./indexPlugin";

export default (config: { name: string; avatar: string; description: string; giscus: { repo: string; repoId: string; category: string; categoryId: string; }; }) => {
    const mainConfig = {
        name: config.name,
        avatar: config.avatar,
        description: config.description,
        giscus: {
            repo: config.giscus.repo,
            repoId: config.giscus.repoId,
            category: config.giscus.category,
            categoryId: config.giscus.categoryId
        }
    };
    writeFile(apiDir.root, 'main.json', mainConfig);
}