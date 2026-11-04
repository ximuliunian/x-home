<template>
    <container :height="height" :title="title" :width="width">
        <span
            v-for="item in barrageList"
            :key="item.id"
            :style="{ top: item.top + 'px', background: item.gradient }"
            class="tags-content"
            @animationend="finishBarrage(item.id)"
        >
            {{ item.text }}
        </span>
    </container>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import useLCG from "@/composition/useLCG";
import Container from "@/components/Container.vue";
import config from "virtual:yaml-config";

// 标题
const title = "标签";
// 宽度
const width = "100%";
// 高度
const height = "160px";
// 弹幕生成时间
const barrageTime = 1600;
// 轨道数量（每条轨道互不重叠）
const trackCount = 4;
// 轨道间距
const trackGap = 38;
// 单条弹幕动画时长（与样式中的 animation 保持一致）
const animationTime = 9000;

// 渐变色列表
const gradients = [
    "linear-gradient(135deg, #6e8efb, #a777e3)",
    "linear-gradient(135deg, #f093fb, #f5576c)",
    "linear-gradient(135deg, #4facfe, #00f2fe)",
    "linear-gradient(135deg, #43e97b, #38f9d7)",
    "linear-gradient(135deg, #fa709a, #fee140)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    "linear-gradient(135deg, #ff9a9e, #fecfef)",
];

// 弹幕列表
const barrageList = ref([]);
// 伪随机数生成
const { randomInt } = useLCG();

// 上一次弹幕的下标
let lastIndex = -1;
// 弹幕唯一标识
let uid = 0;
// 定时器
let timer = null;

// 创建弹幕元素
function createBarrage() {
    if (!config.tags.length) return;

    // 随机取一个与上一条不同的标签
    let index = randomInt(0, config.tags.length - 1);
    if (config.tags.length > 1) {
        while (index === lastIndex) {
            index = randomInt(0, config.tags.length - 1);
        }
    }
    lastIndex = index;
    const text = config.tags[index];

    // 找出当前空闲的轨道，全部占用时跳过本次生成
    const usedTracks = new Set(barrageList.value.map((item) => item.track));
    const freeTracks = [];
    for (let i = 0; i < trackCount; i++) {
        if (!usedTracks.has(i)) freeTracks.push(i);
    }
    if (!freeTracks.length) return;

    const track = freeTracks[randomInt(0, freeTracks.length - 1)];
    const gradient = gradients[randomInt(0, gradients.length - 1)];
    const id = ++uid;

    barrageList.value.push({
        id,
        text,
        track,
        top: track * trackGap,
        gradient,
    });

    // 兜底：动画事件未触发时也移除，避免残留
    setTimeout(() => finishBarrage(id), animationTime + 500);
}

// 移除已经播放完成的弹幕
function finishBarrage(id) {
    barrageList.value = barrageList.value.filter((item) => item.id !== id);
}

// 页面隐藏时清空弹幕，恢复时重新生成
function handleVisibilityChange() {
    barrageList.value = [];
    if (!document.hidden) createBarrage();
}

onMounted(() => {
    createBarrage();
    timer = setInterval(createBarrage, barrageTime);
    document.addEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeUnmount(() => {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<style scoped>
.tags-content {
    display: inline-block;
    padding: 6px 12px;
    color: white;
    border-radius: 50px;
    position: absolute;
    top: 50%;
    left: 100%;
    white-space: nowrap;
    animation: moveLeft 9s linear;
    animation-fill-mode: forwards;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 5;
}

@keyframes moveLeft {
    from {
        left: 105%;
        transform: translateX(0);
    }

    to {
        left: -100%;
        transform: translateX(0);
    }
}
</style>
