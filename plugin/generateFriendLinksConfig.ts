import { apiDir, findAndReadJsonFiles, findAndReadJsonFilesType, sourcePath, splitNum, writeFile } from "./indexPlugin";

interface FriendLink {
    sort?: string;
    sorts?: string;
}

interface FriendLinksConfig {
    links?: { sort: string; }[];
}

export default (friendLinks: FriendLinksConfig) => {
    const sorts = new Set(friendLinks.links?.map(link => link.sort));
    const jsonFilesWithContent: FriendLink[] = [];

    findAndReadJsonFiles(sourcePath.friendLinks, (object, type) => {
        if (findAndReadJsonFilesType.file === type) {
            jsonFilesWithContent.push(object as FriendLink);
        }
    });

    const notSorted: FriendLink[] = [];
    const sorted: Record<string, FriendLink[]> = {};

    jsonFilesWithContent.forEach(json => {
        const sort = json?.sorts;
        if (sort != null && sorts.has(sort)) {
            if (sorted[sort] == null) sorted[sort] = [];
            sorted[sort].push(json);
        } else {
            notSorted.push(json);
        }
        delete json.sorts;
    });

    const main: string[] = [];

    function splitList(array: FriendLink[], fileName: string) {
        if (array.length > 0) {
            if (array.length >= splitNum) {
                for (let i = 0; i < array.length; i += splitNum) {
                    const fn = `${fileName}-${i / splitNum}.json`;
                    writeFile(apiDir.friendLinks, fn, array.slice(i, i + splitNum));
                    main.push(`${fileName}-${i / splitNum}`);
                }
            } else {
                writeFile(apiDir.friendLinks, `${fileName}.json`, array);
                main.push(fileName);
            }
        }
    }

    splitList(notSorted, 'notSorted');
    Object.keys(sorted).forEach(key => splitList(sorted[key], key));
    writeFile(apiDir.root, 'friendLinks.json', main);
}