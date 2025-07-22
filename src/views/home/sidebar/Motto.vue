<template>
    <container height="auto" title="座右铭" width="100%">
        <div class="motto-content">
            <span class="motto-content-top">{{ config.motto.top }}</span>
            <span class="motto-content-bottom">{{ config.motto.bottom }}</span>
        </div>
    </container>
</template>

<script setup>
import Container from "@/components/Container.vue";
import config from 'virtual:yaml-config';
</script>

<style scoped>
/* 座右铭 */
.motto-content {
    padding: 15px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* 上文 */
.motto-content-top {
    font-style: italic;
    font-weight: 500;
    color: #4a5568;
    text-align: center;
    transition: all 0.3s ease;
}

/* 下文 */
.motto-content-bottom {
    font-weight: 700;
    color: #2d3748;
    text-align: center;
    transition: all 0.3s ease;
}

/* 悬停效果 */
.container:hover .motto-content-top,
.container:hover .motto-content-bottom {
    transform: translateY(-3px);
}
</style>