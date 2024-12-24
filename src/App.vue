<template>
  <Loading :flag="loadingFlag"/>
  <div id="background-image" :style="{backgroundImage: 'url(' + backgroundImage + ')'}">
    <div class="mask-layer"></div>
  </div>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
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
import {computed, inject, ref} from "vue";

// 全局配置
const config = inject('config')
// 年份
const year = new Date().getFullYear();
// 随机数生成
const {randomInt} = useLCG();
// 加载动画开关
let loadingFlag = ref(false);

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
imageLoad.onload = () => {
  loadingFlag.value = true
}
</script>

<style scoped>
.fade-enter-from{
  opacity: 0;
  transform: translateX(-50%);
}

.fade-enter-to{
  transform: translateX(0%);
  opacity: 1;
}

.fade-leave-active,.fade-enter-active {
  transition: all 0.5s ease-out;
}

.fade-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.fade-leave-to{
  transform: translateX(50%);
  opacity: 0;
}


/* 容器 */
.container {
  padding-top: 2vw;
  padding-bottom: 40px;
}

/* 页脚 */
.siteInfo {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: fixed;
  bottom: 0;
  backdrop-filter: blur(30px);
  color: white;
  -webkit-user-select: none;

  a {
    color: white;
    text-decoration: none;
  }
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
}

/* 遮罩层 */
.mask-layer {
  width: 100%;
  height: 100%;
  position: fixed;
  backdrop-filter: blur(30px);
}
</style>
