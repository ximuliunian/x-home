import { apiDir, findAndReadJsonFiles, findAndReadJsonFilesType, sourcePath, writeFile } from "./indexPlugin";

export default (gossipConfig) => {
    // 入口
    const main = [];

    findAndReadJsonFiles(sourcePath.gossip, (object, type) => {
        if (findAndReadJsonFilesType.file !== type) return
        
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

    writeFile(apiDir.root, 'gossip.json', { ...gossipConfig, list: main })
}