/**
 * 根 API 模块
 * 提供获取主配置、友链入口、闲言碎语入口等核心 API
 */

import request from "@/composition/request";

/**
 * 获取主配置
 * @returns {Promise<unknown>} - 主配置数据
 */
export function getMain() {
    return request({
        url: '/main.json',
        method: 'get'
    })
}

/**
 * 通过 URL 获取主配置
 * @param {string} url - 目标 URL
 * @returns {Promise<unknown>} - 主配置数据
 */
export function getMainByUrl(url: string) {
    return request({
        url: `${url}/api/main.json`,
        method: 'get'
    })
}

/**
 * 获取友链入口列表
 * @returns {Promise<string[]>} - 友链入口数据
 */
export function getFriendLink(): Promise<string[]> {
    return request({
        url: '/friendLinks.json',
        method: 'get'
    })
}

/**
 * 获取闲言碎语入口列表
 * @returns {Promise<unknown>} - 闲言碎语入口数据
 */
export function getGossipMain() {
    return request({
        url: '/gossip.json',
        method: 'get'
    })
}

/**
 * 通过 URL 获取闲言碎语入口列表
 * @param {string} url - 目标 URL
 * @returns {Promise<unknown>} - 闲言碎语入口数据
 */
export function getGossipMainByUrl(url: string) {
    return request({
        url: `${url}/api/gossip.json`,
        method: 'get'
    })
}