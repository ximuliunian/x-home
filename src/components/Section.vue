<template>
    <div class="section-container">
        <div class="section">
            <Icon :icon="icon" height="40px" width="40px" />
            <span style="margin-left: 10px">{{ title }}</span>
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

defineProps({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.section-container {
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    padding: 10px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
}

/* 标题 */
.section {
    padding: 5px 0;
    display: flex;
    align-items: center;
    border-bottom: 3px dashed #6e8efb;
    font-weight: 700;
    font-size: 24px;
    color: #2d3748;
    transition: all 0.3s ease;
}

/* 内容 */
.content {
    margin-top: 25px;
    position: relative;
}
</style>