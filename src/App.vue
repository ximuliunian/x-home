<template>
    <Loading :flag="loadingFlag" />
    <div id="background-image" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <div class="mask-layer"></div>
    </div>
    <div class="container">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
    <footer class="siteInfo">
        <span> <a href="https://github.com/ximuliunian/xmln-home">曦暮流年 © {{ year }}</a> </span>
        <span v-if="icp"> | <a href="https://beian.miit.gov.cn">{{ icp }}</a> </span>
    </footer>
</template>
<script setup>
import useLCG from "@/composition/useLCG.js";
import Loading from "@/components/loading.vue";
import { computed, onMounted, ref } from "vue";
import { localStorageInit } from "@/composition/localStorage.js";
import gossip from "@/composition/gossip.js";
import config from 'virtual:yaml-config';


// 年份
const year = new Date().getFullYear();
// 随机数生成
const { randomInt } = useLCG();
// 加载动画开关
let loadingFlag = ref(false);

onMounted(() => {
    // 本地存储初始化
    localStorageInit()

    // 初始化用户信息列表
    gossip.initUserInfoData(config._gossip)

    // 初始化访问数据
    gossip.initQueryData(config._gossip)
})

// ICP备案号
const icp = computed(() => {
    const hostname = location.hostname;
    for (let i = 0; i < config.icp.length; i++) {
        const item = config.icp[i];
        if (hostname.endsWith(item.domain)) {
            return item.info;
        }
    }
})

// 随机选取背景图片
let backgroundImage = computed(() => {
    const size = randomInt(0, config.background_image.length - 1);
    return config.background_image[size]
});

// 背景图片加载判断
const imageLoad = new Image();
imageLoad.src = backgroundImage.value;
imageLoad.onload = () => loadingFlag.value = true

</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
    transform: translateX(-50%);
}

.fade-enter-to {
    transform: translateX(0%);
    opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
    transition: all 0.5s ease-out;
}

.fade-leave-from {
    transform: translateX(0%);
    opacity: 1;
}

.fade-leave-to {
    transform: translateX(50%);
    opacity: 0;
}


/* 容器 */
.container {
    padding-top: 2vw;
    padding-bottom: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

/* 页脚 */
.siteInfo {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: fixed;
    bottom: 0;
    backdrop-filter: blur(30px);
    color: white;
    -webkit-user-select: none;
    background: rgba(0, 0, 0, 0.2);
    font-size: 14px;
    z-index: 100;
}

.siteInfo a {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
}

.siteInfo a:hover {
    color: #a777e3;
    text-decoration: underline;
}

/* 背景图片 */
#background-image {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    user-select: none;
    transition: all 0.5s ease;
}

/* 遮罩层 */
.mask-layer {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(124, 124, 124, 0.5);
}
</style>