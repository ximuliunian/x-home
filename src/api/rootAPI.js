import request from "@/composition/request.js";

// 获取主配置
export function getMain() {
    return request({
        url: '/main.json',
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
export function getGossip() {
    return request({
        url: '/gossip.json',
        method: 'get'
    })
}

// 获取闲言碎语外传入口列表
export function getPublicGossip() {
    return request({
        url: '/publicGossip.json',
        method: 'get'
    })
}