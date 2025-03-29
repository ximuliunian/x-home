import request from "@/composition/request.js";

// 获取主配置
export function getMain() {
    return request({
        url: '/main.json',
        method: 'get'
    })
}

// 获取主配置
export function getMainByUrl(url) {
    return request({
        url: `${url}/api/main.json`,
        method: 'get'
    })
}

// 获取友链入口列表
export function getFriendLink() {
    return request({
        url: '/friendLinks.json',
        method: 'get'
    })
}

// 获取闲言碎语入口列表
export function getGossipMain() {
    return request({
        url: '/gossip.json',
        method: 'get'
    })
}

// 获取闲言碎语入口列表通过指定URL
export function getGossipMainByUrl(url) {
    return request({
        url: `${url}/api/gossip.json`,
        method: 'get'
    })
}