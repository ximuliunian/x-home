import { apiDir, findAndReadJsonFiles, findAndReadJsonFilesType, sourcePath, splitNum, writeFile } from "./indexPlugin";

export default (friendLinks) => {
    // 获取友链配置所有分类
    const sorts = new Set(friendLinks.links.map(link => link.sort));

    // 查找并读取所有JSON文件
    const jsonFilesWithContent = [];
    findAndReadJsonFiles(sourcePath.friendLinks, (object, type) => {
        if (findAndReadJsonFilesType.file === type) {
            jsonFilesWithContent.push(object)
        }
    })

    // 分类
    const notSorted = [];
    const sorted = {};

    // 分组
    jsonFilesWithContent.forEach(json => {
        let sort = json?.sorts;
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
