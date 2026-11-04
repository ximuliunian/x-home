<template>
    <div class="avatar">
        <img :src="config.avatar" alt="阿巴阿巴~" />
        <div class="avatar-status">
            <span id="icon">{{ config.avatar_status.icon }}</span>
            <span id="text">{{ config.avatar_status.text }}</span>
        </div>
    </div>
    <container close-title>
        {{ config.description }}
    </container>
</template>

<script setup lang="ts">
import Container from "@/components/Container.vue";
import config from "virtual:yaml-config";
</script>

<style scoped>
.avatar {
    position: relative;
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
}

.avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.55);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
}

.avatar:hover img {
    transform: translateY(-3px);
    box-shadow: 0 14px 36px rgba(15, 23, 42, 0.22);
}

.avatar-status {
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 10%;
    left: 80%;
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 1;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50px;
    padding-left: 4px;
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(8px);
    transition:
        width 0.3s ease,
        transform 0.3s ease;
}

.avatar-status:hover {
    width: 120px;
    z-index: 999;
}

#icon {
    display: inline-block;
}

#text {
    display: inline-block;
    margin-left: 5px;
}
</style>
