/**
 * 闲言碎语数据管理模块
 * 负责初始化和管理闲言碎语相关的数据
 */

import { getGossipMain, getGossipMainByUrl, getMainByUrl } from "@/api/rootAPI";
import { reactive } from "vue";
import commonlyFunctions from "@/composition/commonlyFunctions";
import localStorage from "@/composition/localStorage";
import config from 'virtual:yaml-config';

/**
 * 外传开关类型定义
 * 记录对方是否关联了当前用户
 */
interface GossipPublic {
    [key: string]: { flag: boolean };
}

/**
 * 初始化闲言碎语内容数据
 * 请求域主及其关联用户的闲言碎语主文件，处理并存储到本地
 */
const initQueryData = async (): Promise<void> => {
    // 清空外传缓存
    localStorage.setContent(localStorage.menu.GOSSIP_PUBLIC_BOOL, {});

    // 原始数据容器
    const rawData = reactive<Record<string, unknown>>({});
    // 判断域主的闲言碎语主文件是否请求完成
    let flag = false;

    // 请求域主的主文件
    getGossipMain().then(resp => {
        if (resp === 'error') return;
        rawData[location.origin] = resp;
        flag = true;
        handleGossipContentListData(rawData);
    });

    // 获取屏蔽列表
    const shield = localStorage.getContent(localStorage.menu.GOSSIP_SHIELD) as string[] || [];

    // 请求域主关联用户的主文件
    config._gossip.links?.forEach((link: string) => {
        getGossipMainByUrl(link).then(resp => {
            if (resp === 'error') return;
            const origin = new URL(link).origin;
            rawData[origin] = resp;
            // 主文件没请求下来不需要处理数据
            if (flag || !shield.includes(origin)) {
                handleGossipContentListData(rawData);
            }
        });
    });
}

/**
 * 处理闲言碎语内容数据
 * 过滤、排序并存储到本地
 * @param {Record<string, unknown>} data - 原始数据
 */
function handleGossipContentListData(data: Record<string, unknown>): void {
    // 获取本地存储的内容列表
    const contentList = localStorage.getContent(localStorage.menu.GOSSIP_CONTENT_LIST) as string[] || [];
    // 获取外传开关缓存
    let gossipPublic = localStorage.getContent(localStorage.menu.GOSSIP_PUBLIC_BOOL) as GossipPublic || {};

    // 遍历所有数据
    for (const key in data) {
        const d = data[key] as { settings: { public: number }; links: string[]; list: string[] };

        // 判断是否需要检查关联关系
        if (d.settings.public === 1 || config._gossip.settings.internalDisplay === 1) {
            // 检查缓存
            if (gossipPublic && gossipPublic[key]) {
                // 如果缓存的开关是 false，代表"我"不在对方的关联人列表中
                if (!gossipPublic[key].flag) continue;
            } else {
                let flag = true;
                // 遍历对方的关联人列表
                for (const link of Object.keys(d.links)) {
                    if (new URL(link).host === location.host) {
                        flag = false;
                        break;
                    }
                }

                // 如果开关还是 true，代表"我"不在对方的关联人列表中
                if (flag) {
                    gossipPublic[key] = { flag: false };
                    continue;
                } else {
                    gossipPublic[key] = { flag: true };
                }
            }
        } else {
            // 所有人都可以拉取
            gossipPublic[key] = { flag: true };
        }

        // 保存缓存
        localStorage.setContent(localStorage.menu.GOSSIP_PUBLIC_BOOL, gossipPublic);

        // 添加内容到列表
        d.list.forEach(item => {
            const searchElement = `${item}-${key}`;
            // 避免重复添加
            if (contentList.includes(searchElement)) return;
            contentList.push(searchElement);
        });
    }

    // 排序并保存到本地
    commonlyFunctions.sort(contentList);
    localStorage.setContent(localStorage.menu.GOSSIP_CONTENT_LIST, contentList);
}

/**
 * 初始化用户信息数据
 * 请求域主及其关联用户的主配置，处理并存储到本地
 */
const initUserInfoData = (): void => {
    // 获取本地存储的用户信息
    let userInfo = localStorage.getContent(localStorage.menu.GOSSIP_USER_LIST) as Record<string, unknown> || {};

    // 请求域主的主配置
    getMainByUrl(location.origin).then(resp => {
        if (resp === 'error') return;
        const userData = resp as { avatar: string };
        userData.avatar = location.origin + '/' + userData.avatar;
        userInfo[location.origin] = userData;
        localStorage.setContent(localStorage.menu.GOSSIP_USER_LIST, userInfo);
    });

    // 请求关联用户的主配置
    config._gossip.links?.forEach((link: string) => {
        getMainByUrl(link).then(resp => {
            if (resp === 'error') return;
            const userData = resp as { avatar: string };
            userData.avatar = `${link}/${userData.avatar}`;
            userInfo[new URL(link).origin] = userData;
            localStorage.setContent(localStorage.menu.GOSSIP_USER_LIST, userInfo);
        });
    });
}

/**
 * 导出闲言碎语数据管理方法
 */
export default {
    initQueryData,      // 初始化内容数据
    initUserInfoData    // 初始化用户信息
}