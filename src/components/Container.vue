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
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    margin-bottom: 20px;
    padding: 10px;
    border: none;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

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

.content {
    position: relative;
}
</style>
