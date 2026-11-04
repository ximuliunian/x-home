<template>
    <div class="floating-buttons">
        <button class="float-btn back" @click="goBack" title="返回上一级">
            <Icon icon="icon-sys-fanhui" width="20px" height="20px" />
        </button>
        <button class="float-btn top" @click="scrollToTop" title="回到顶部">
            <Icon icon="icon-sys-dingbu" width="20px" height="20px" />
        </button>
    </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";

const goBack = (): void => {
    window.history.back();
};

const scrollToTop = (): void => {
    if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        const scrollStep = -window.scrollY / 15;
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }
};
</script>

<style scoped>
.floating-buttons {
    position: fixed;
    bottom: 50px;
    right: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 1000;
}

.float-btn {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.85);
    color: var(--primary-color);
    border-radius: 50%;
    border: var(--border-soft);
    box-shadow: var(--shadow-soft);
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.float-btn:hover {
    color: white;
    transform: translateY(-3px);
    background: linear-gradient(
        135deg,
        var(--primary-color),
        var(--secondary-color)
    );
    box-shadow: var(--shadow-lift);
}

@media (max-width: 768px) {
    .floating-buttons {
        bottom: 20px;
        right: 20px;
    }

    .float-btn {
        width: 45px;
        height: 45px;
    }
}
</style>
