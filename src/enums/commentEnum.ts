/**
 * 评论相关枚举模块
 * 定义评论系统使用的枚举值
 */

import type { Mapping } from "@giscus/vue";

/**
 * 评论映射方式枚举
 * 用于指定评论系统如何映射页面
 */
const MappingEnum: Record<string, Mapping> = {
    PATH_NAME: "pathname",  // 地址栏路径映射
    SPECIFIC: "specific"   // 指定文本映射
}

/**
 * 导出评论相关枚举
 */
export default {
    MappingEnum
}