// 命名空间

const NAMESPACE = 'xmln_home'

// 空间命名枚举
const ModelMenu = {
    HITOKOTO: 'HITOKOTO',   // 一言

    GOSSIP_CONTENT_LIST: 'GOSSIP_CONTENT_LIST',   // 闲言碎语内容列表
    GOSSIP_SETTING: 'GOSSIP_SETTING',   // 闲言碎语设置
    GOSSIP_PUBLIC_BOOL: 'GOSSIP_PUBLIC_BOOL',   // 对方是否关联了我

}

// 空间命名初始化
const initContent = {
    [ModelMenu.GOSSIP_SETTING]: {
        // 只看域主
        onlyLookDomainMaster: false,
        // 黑名单
        blacklist: [],
    },
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
    // 空间内，对于声明的内容进行初始化
    for (let modelMenuKey in ModelMenu) {
        if (!getContent(ModelMenu[modelMenuKey])) {
            setContent(ModelMenu[modelMenuKey], initContent[modelMenuKey] || null);
        }
    }
    // 空间内，对于没有声明的内容进行销毁
    for (let key in JSON.parse(localStorage.getItem(NAMESPACE))) {
        if (!Object.values(ModelMenu).includes(key)) {
            const storage = JSON.parse(localStorage.getItem(NAMESPACE))
            delete storage[key]
            localStorage.setItem(NAMESPACE, JSON.stringify(storage))
        }
    }
}

// 导出
export default {
    menu: ModelMenu,
    getContent,
    setContent
}