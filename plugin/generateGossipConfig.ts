import { apiDir, findAndReadJsonFiles, findAndReadJsonFilesType, sourcePath, writeFile } from "./indexPlugin";

interface GossipObject {
    info: { id?: string; };
    content: string[];
}

interface GossipConfig {
    links?: string[];
    settings?: { public?: number; internalDisplay?: number; };
}

export default (gossipConfig: GossipConfig) => {
    const main: string[] = [];

    findAndReadJsonFiles(sourcePath.gossip, (object, type) => {
        if (findAndReadJsonFilesType.file !== type) return;

        const gossipObject = object as GossipObject;
        const info = gossipObject.info;

        if (info.id == null || info.id === '') return;

        main.push(info.id);
        writeFile(apiDir.gossip, `${info.id}.json`, gossipObject);

        gossipObject.content = [...gossipObject.content.slice(0, 2), "p:......"];
        writeFile(apiDir.gossip, `${info.id}-cut.json`, gossipObject);
    });

    function sort(list: string[]) {
        list.sort((a, b) => {
            const [dateA, numA] = a.split('-');
            const [dateB, numB] = b.split('-');

            const dateValueA = dateA.replace(/\./g, '');
            const dateValueB = dateB.replace(/\./g, '');

            if (dateValueA > dateValueB) return -1;
            if (dateValueA < dateValueB) return 1;

            return parseInt(numB) - parseInt(numA);
        });
    }

    sort(main);
    writeFile(apiDir.root, 'gossip.json', { ...gossipConfig, list: main });
}