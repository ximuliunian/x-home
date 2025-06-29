<template>
    <div :style="closeWidth ? null : { width: width }" class="container">
        <div v-if="!closeTitle" class="title">{{ title }}</div>
        <div :style="{ height: height }" class="content">
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({
    // 标题
    title: {
        type: String,
    },
    // 宽度
    width: {
        type: String,
        default: '100%'
    },
    // 高度
    height: {
        type: String,
        default: 'auto'
    },
    // 消失宽度
    disappearWidth: {
        type: String,
        default: '0px'
    },
    // 关闭标题
    closeTitle: {
        type: Boolean,
        default: false
    },
    // 关闭宽度
    closeWidth: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
/* 容器 */
.container {
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    margin-bottom: 20px;
    padding: 10px;
    border: none;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.container:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* 标题 */
.title {
    display: block;
    border-left: #6e6e6e 5px solid;
    padding-left: 10px;
    height: 20px;
    line-height: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #3a3a3a;
}

/* 内容 */
.content {
    position: relative;
}
</style>