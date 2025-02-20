// 新页面打开链接
function openLink(url, isBlank) {
    if (!url) return
    isBlank = isBlank | false
    window.open(url, isBlank ? '_blank' : '_self');
}

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
    console.log(list)
}

// 导出
export default () => {
    return {
        openLink,
        sort
    }
}