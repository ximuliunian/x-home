<template>
    <div :style="closeWidth ? null : { width: width }" class="container">
        <div v-if="!closeTitle" class="title">{{ title }}</div>
        <div :style="{ height: height }" class="content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string;
    width?: string;
    height?: string;
    disappearWidth?: string;
    closeTitle?: boolean;
    closeWidth?: boolean;
}

withDefaults(defineProps<Props>(), {
    width: "100%",
    height: "auto",
    disappearWidth: "0px",
    closeTitle: false,
    closeWidth: false,
});
</script>

<style scoped>
.container {
    border-radius: var(--radius-md);
    background-color: var(--card-bg);
    overflow: hidden;
    margin-bottom: 20px;
    padding: 10px;
    border: var(--border-soft);
    backdrop-filter: blur(12px);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.3s ease;
    box-shadow: var(--shadow-soft);
}

.container:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lift);
    background-color: var(--card-bg-strong);
}

.title {
    position: relative;
    display: block;
    padding-left: 14px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
    color: var(--text-color);
}

.title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    border-radius: 2px;
    background: linear-gradient(
        180deg,
        var(--primary-color),
        var(--secondary-color)
    );
}

.content {
    position: relative;
}
</style>
