/**
 * 闲言碎语 API 模块
 * 提供获取闲言碎语内容的相关 API
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

/**
 * 通过 URL 获取指定 ID 的完整闲言碎语
 * @param {string} name - 闲言碎语 ID
 * @param {string} url - 目标 URL
 * @returns {Promise<GossipContent>} - 完整闲言碎语数据
 */
export function getGossipByUrl(name: string, url: string): Promise<GossipContent> {
    return request({
        url: `${url}/api/gossip/${name}.json`,
        method: 'get'
    })
}

/**
 * 通过 URL 获取指定 ID 的精简版闲言碎语
 * @param {string} name - 闲言碎语 ID
 * @param {string} url - 目标 URL
 * @returns {Promise<GossipContent>} - 精简版闲言碎语数据
 */
export function getGossipCutByUrl(name: string, url: string): Promise<GossipContent> {
    return request({
        url: `${url}/api/gossip/${name}-cut.json`,
        method: 'get'
    })
}