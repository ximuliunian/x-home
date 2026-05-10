/**
 * 通用工具函数模块
 * 提供项目中常用的工具方法
 */

/**
 * 在新窗口或当前窗口打开链接
 * @param {string | undefined} url - 要打开的链接地址
 * @param {boolean} [isBlank=false] - 是否在新窗口打开
 */
function openLink(url: string | undefined, isBlank?: boolean): void {
    if (!url) return;
    isBlank = isBlank ?? false;
    window.open(url, isBlank ? '_blank' : '_self');
}

/**
 * 对列表进行排序（格式：xxxx.xx.xx-xx）
 * 先按日期降序排序，日期相同时按数字降序排序
 * @param {string[]} list - 待排序的列表
 */
function sort(list: string[]): void {
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

/**
 * 导出通用工具函数
 */
export default {
    openLink,    // 打开链接
    sort         // 排序方法
}