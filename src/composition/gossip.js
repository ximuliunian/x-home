import {getGossipMainByUrl} from "@/api/gossipAPI.js";
import {gossipConfig} from "../../config/GossipConfiguration.js";
import {getGossipMain} from "@/api/rootAPI.js";
import {reactive} from "vue";
import commonlyFunctions from "@/composition/commonlyFunctions.js";
import localStorage from "@/composition/localStorage.js";
// 初始化访问数据
const initQueryData = async () => {
    const host = location.host;

    const rawData = reactive({}); // 原始数据


    // 请求包括自己在内的所有人的闲言闲语主文件
    await getGossipMain().then(resp => {
        if (typeof resp !== 'object') return
        rawData[host] = resp
    })
    for (const link of gossipConfig.links) {
        await getGossipMainByUrl(link).then(resp => {
            if (typeof resp !== 'object') return
            rawData[new URL(link).host] = resp
        })
    }

    const contentList = reactive([]); // 渲染数据

    // 过滤出渲染数据
    for (const key in rawData) {
        rawData[key].list.forEach(item => {
            contentList.push(`${item}-${key}`)
        })
    }

    // 排序并保存到本地
    commonlyFunctions.sort(contentList)
    localStorage.setContent(localStorage.menu.GOSSIP_CONTENT_LIST, contentList)

    const publicIndex = reactive({}); // 外传索引

    // 过滤出所需外传信息
    for (const key in rawData) {
        publicIndex[key] = rawData[key].links.indexOf(host)
    }
    localStorage.setContent(localStorage.menu.GOSSIP_PUBLIC_BOOL, publicIndex)

    // TODO 根据闲言碎语配置文件重新编写逻辑
}

// 导出
export default {
    initQueryData
}