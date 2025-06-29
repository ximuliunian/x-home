<template>
    <div class="top">
        <div v-if="config.enable.home.welcome" class="welcome">Hello, I' m <span>{{ config.name }}</span></div>

        <div v-if="config.enable.home.social" class="social-links">
            <container v-for="(item, key) in config.social" :key="key" class="social-link" close-title close-width
                @click="commonlyFunctions.openLink(item.url, true)">
                <div class="link-card">
                    <icon :icon="item.icon" height="30px" width="30px" />
                    <span style="margin-left: 5px">{{ item.name }}</span>
                </div>
            </container>
            <i v-for="i in 4" class="placeholder"></i>
        </div>

        <div v-if="config.enable.home.githubContribution" class="github-contribution">
            <img alt="github contribution" src="/img/github-contribution.svg" width="100%" />
        </div>
    </div>
</template>

<script setup>
import { inject } from "vue";
import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";
import commonlyFunctions from "@/composition/commonlyFunctions.js";
// 全局配置
const config = inject("config");
</script>

<style scoped>
/* 社交链接 */
.social-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;
    gap: 15px;

    /* 占位符 */
    .placeholder {
        width: 23%;
        min-width: 150px;
    }

    .social-link {
        width: 23%;
        min-width: 150px;
        transition: all 0.3s ease;
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;

        .link-card {
            display: flex;
            align-items: center;
            padding: 12px 15px;
            background: rgba(255, 255, 255, 0.5);
            transition: all 0.3s ease;
        }
    }

    .social-link:hover {
        .link-card {
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
    }
}

/* 欢迎文本 */
.welcome {
    font-weight: 800;
    font-size: 55px;
    margin: 20px 0 30px;
    line-height: 1.2;

    /* 渐变文字 */
    span {
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200%;
        background-position: 0;
        animation: backgroundSizeAnimation 10s ease-in-out infinite;
        background-image: linear-gradient(120deg, #6e8efb, #a777e3 30%, #5dc1e6 60%);
    }
}

/* 根元素 */
.top {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
}

.github-contribution {
    margin-top: 30px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px dashed var(--milky-white);
    background-color: rgba(219, 219, 219, 0.3);
}

.github-contribution:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 当屏幕宽度小于 800 时 */
@media only screen and (max-width: 800px) {

    /* 社交链接 */
    .social-link {
        width: 48% !important;
    }

    /* 欢迎文本 */
    .welcome {
        font-size: 9vw;
        margin: 2vw 0;
    }
}

/* 动画 */
@keyframes backgroundSizeAnimation {
    0% {
        background-position: 100%;
    }

    25% {
        background-position: 50%;
    }

    50% {
        background-position: 0;
    }

    75% {
        background-position: 50%;
    }

    100% {
        background-position: 100%;
    }
}
</style>