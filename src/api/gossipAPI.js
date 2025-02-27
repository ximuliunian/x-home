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