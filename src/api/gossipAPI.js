import request from "@/composition/request.js";

// 获取指定ID的完成版闲言碎语
export function getGossip(name) {
    return request({
        url: `/gossip/${name}.json`,
        method: 'get'
    })
}

// 获取指定ID的阉割版闲言碎语
export function getGossipCut(name) {
    return request({
        url: `/gossip/${name}-cut.json`,
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

// 获取指定ID的完成版闲言碎语通过指定URL
export function getGossipByUrl(name, url) {
    return request({
        url: `${url}/api/gossip/${name}.json`,
        method: 'get'
    })
}

// 获取指定ID的阉割版闲言碎语通过指定URL
export function getGossipCutByUrl(name, url) {
    return request({
        url: `${url}/api/gossip/${name}-cut.json`,
        method: 'get'
    })
}