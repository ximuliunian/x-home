// 新页面打开链接
function openLink(url, isBlank) {
    if (!url) return
    isBlank = isBlank | false
    window.open(url, isBlank ? '_blank' : '_self');
}

// 导出
export default () => {
    return {
        openLink,
    }
}