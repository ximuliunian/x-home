<template>
  <div class="top">
    <div class="welcome">Hello, I' m <span>{{ config.name }}</span></div>

    <div v-if="config.social.enable" class="social-links">
      <container v-for="(item, key) in config.social.info" :key="key" class="social-link" close-title
                 close-width @click="openLink(item.url)">
        <div class="link-card">
          <icon :icon="item.icon" height="30px" width="30px"/>
          <span style="margin-left: 5px">{{ item.name }}</span>
        </div>
      </container>
    </div>

    <div class="github-contribution">
      <img alt="github contribution" src="/img/github-contribution.svg" width="100%"/>
    </div>
  </div>
</template>

<script setup>
import {inject} from "vue";
import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";
// 全局配置
const config = inject("config");

// 新页面打开链接
function openLink(url) {
  window.open(url, '_blank');
}
</script>

<style scoped>
/* 社交链接 */
.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;

  .social-link {
    width: 19%;

    .link-card {
      display: flex;
      align-items: center;
    }
  }

  .social-link:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.3s;
  }
}

/* 欢迎文本 */
.welcome {
  font-weight: 800;
  font-size: 55px;

  /* 渐变文字 */

  span {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200%;
    background-position: 0;
    animation: backgroundSizeAnimation 10s ease-in-out infinite;
    background-image: linear-gradient(120deg, #bd34fe, #e0321b 30%, #41d1ff 60%);
  }
}

/* 根元素 */
.top {
  width: 100%;
  height: auto;
}

/* 当屏幕宽度小于 800 时 */
@media only screen and (max-width: 800px) {
  /* 社交链接 */
  .social-link {
    width: 49% !important;
    transition: width 0.3s;
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