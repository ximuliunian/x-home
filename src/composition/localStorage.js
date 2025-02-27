// 命名空间

const NAMESPACE = 'xmln_home'

// 空间命名枚举
const ModelMenu = {
    HITOKOTO: 'hitokoto'
}

// 获取命名空间内的对象
const getContent = (menu) => {
    const parse = JSON.parse(localStorage.getItem(NAMESPACE));
    return parse[menu];
}

// 设置命名空间内的对象
const setContent = (menu, content) => {
    const parse = JSON.parse(localStorage.getItem(NAMESPACE));
    parse[menu] = content
    localStorage.setItem(NAMESPACE, JSON.stringify(parse))
}

// 初始化
export const localStorageInit = () => {
    if (!localStorage.getItem(NAMESPACE)) {
        localStorage.setItem(NAMESPACE, JSON.stringify({}));
    }
    for (let modelMenuKey in ModelMenu) {
        if (!getContent(ModelMenu[modelMenuKey])) {
            setContent(ModelMenu[modelMenuKey], null);
        }
    }
}

// 导出
export default {
    menu: ModelMenu,
    getContent,
    setContent
}