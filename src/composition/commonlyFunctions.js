// 通用函数
export default () => {
    return {
        openLink
    }
}

// 新页面打开链接
function openLink(url, isBlank) {
    if (!url) return
    isBlank = isBlank | false
    window.open(url, isBlank ? '_blank' : '_self');
}