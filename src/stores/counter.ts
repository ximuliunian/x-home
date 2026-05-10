/**
 * 计数器状态管理模块
 * 使用 Pinia 定义全局计数器状态
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * 定义计数器 Store
 * @returns {{ count: import('vue').Ref<number>, doubleCount: import('vue').ComputedRef<number>, increment: () => void }}
 */
export const useCounterStore = defineStore('counter', () => {
    // 计数器值
    const count = ref(0)

    // 双倍计数器值（计算属性）
    const doubleCount = computed(() => count.value * 2)

    // 增加计数器
    function increment() {
        count.value++
    }

    return { count, doubleCount, increment }
})