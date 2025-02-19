import request from "@/composition/request.js";

// 获取没有分类的友链列表
export function getFriendLink() {
    return request({
        url: '/friendLinks/friendLink.json',
        method: 'get'
    })
}

// 获取指定分类的友链列表
export function getSorted(name) {
    return request({
        url: `/friendLinks/${name}.json`,
        method: 'get'
    })
}