<template>
    <div class="icon-wrapper">
        <svg :style="{ width, height }" aria-hidden="true" class="icon">
            <use :xlink:href="`#${icon}`"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
interface Props {
    icon: string;
    width?: string;
    height?: string;
}

withDefaults(defineProps<Props>(), {
    width: "1em",
    height: "1em",
});
</script>

<style scoped>
.icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.icon {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    transition: all 0.3s ease;
}

a:hover .icon,
button:hover .icon,
.routing:hover .icon,
.social-link:hover .icon,
.project:hover .icon,
.site:hover .icon {
    fill: #6e8efb;
    transform: scale(1.1);
}

.icon[href*="icon-sys-setting"] {
    transition: transform 0.5s ease;
}

.icon-wrapper:hover .icon[href*="icon-sys-setting"] {
    transform: rotate(120deg);
}
</style>
