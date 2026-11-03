/**
 * 本地存储封装模块
 * 提供命名空间隔离的 localStorage 操作方法
 */

/**
 * 本地存储命名空间
 * 用于隔离不同应用的数据
 */
const NAMESPACE = 'xmln_home'

/**
 * 存储键名枚举
 * 定义所有可用的存储键
 */
const ModelMenu = {
    HITOKOTO: 'HITOKOTO',                           // 一言数据
} as const

type ModelMenuValue = typeof ModelMenu[keyof typeof ModelMenu]

/**
 * 获取指定键的内容
 * @param {ModelMenuValue} menu - 存储键名
 * @returns {T} - 存储的内容
 */
const getContent = <T = unknown>(menu: ModelMenuValue): T => {
    const parse = JSON.parse(localStorage.getItem(NAMESPACE) || '{}');
    return parse[menu] as T;
}

/**
 * 设置指定键的内容
 * @param {ModelMenuValue} menu - 存储键名
 * @param {unknown} content - 要存储的内容
 */
const setContent = (menu: ModelMenuValue, content: unknown): void => {
    const parse = JSON.parse(localStorage.getItem(NAMESPACE) || '{}');
    parse[menu] = content;
    localStorage.setItem(NAMESPACE, JSON.stringify(parse));
}

/**
 * 清空所有存储内容
 */
const clear = (): void => {
    const keys = Object.keys(ModelMenu) as (keyof typeof ModelMenu)[];
    for (const key of keys) {
        setContent(ModelMenu[key], null);
    }
}

/**
 * 初始化本地存储
 * 确保命名空间存在，初始化未设置的键，清理无效键
 */
export const localStorageInit = (): void => {
    // 如果命名空间不存在，创建空对象
    if (!localStorage.getItem(NAMESPACE)) {
        localStorage.setItem(NAMESPACE, JSON.stringify({}));
    }

    // 初始化未设置的键
    const keys = Object.keys(ModelMenu) as (keyof typeof ModelMenu)[];
    for (const key of keys) {
        if (!getContent(ModelMenu[key])) {
            setContent(ModelMenu[key], null);
        }
    }

    // 清理无效的键
    const storage = JSON.parse(localStorage.getItem(NAMESPACE) || '{}');
    const validKeys = new Set(Object.values(ModelMenu));
    for (const key in storage) {
        if (!validKeys.has(key as ModelMenuValue)) {
            delete storage[key];
            localStorage.setItem(NAMESPACE, JSON.stringify(storage));
        }
    }
}

/**
 * 导出本地存储操作方法
 */
export default {
    menu: ModelMenu,    // 存储键名枚举
    getContent,         // 获取内容方法
    setContent,         // 设置内容方法
    clear               // 清空方法
}
