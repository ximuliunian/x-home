/**
 * 闲言碎语 API 模块
 * 提供获取本站闲言碎语内容的相关 API
 */

import request from "@/composition/request";

export interface GossipInfo {
    host: string;
    id: string;
}

export interface GossipContent {
    date: string;
    content: string[];
    info: GossipInfo;
}

/**
 * 获取指定 ID 的完整闲言碎语
 * @param {string} name - 闲言碎语 ID
 * @returns {Promise<GossipContent>} - 完整闲言碎语数据
 */
export function getGossip(name: string): Promise<GossipContent> {
    return request({
        url: `/gossip/${name}.json`,
        method: 'get'
    })
}

/**
 * 获取指定 ID 的精简版闲言碎语
 * @param {string} name - 闲言碎语 ID
 * @returns {Promise<GossipContent>} - 精简版闲言碎语数据
 */
export function getGossipCut(name: string): Promise<GossipContent> {
    return request({
        url: `/gossip/${name}-cut.json`,
        method: 'get'
    })
}
