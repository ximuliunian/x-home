/**
 * 友链 API 模块
 * 提供获取友链数据的相关 API
 */

import request from "@/composition/request";

export interface LinkItem {
    name: string;
    desc: string;
    url: string;
    avatar: string;
    bgColor?: string;
}

/**
 * 获取指定分类的友链列表
 * @param {string} name - 分类名称
 * @returns {Promise<LinkItem[]>} - 友链列表数据
 */
export function getSorted(name: string): Promise<LinkItem[]> {
    return request({
        url: `/friendLinks/${name}.json`,
        method: 'get'
    })
}