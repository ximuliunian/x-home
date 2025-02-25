<template>
  <img v-show="isFullScreen" :alt="alt" :src="src" :style="{width: width, height: height}" class="placeholder"/>
  <div :class="isFullScreen ? 'fullScreen' : 'reveal'" @click="toggleFullScreen">
    <img :alt="alt" :src="src"
         :style="{width: isFullScreen ? 'auto' : width, height: isFullScreen ? 'auto' : height, display: 'block'}"/>
  </div>
  <br v-if="!InlineBlock">
</template>

<script setup>
import {ref} from "vue";

defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: '假装这里有一张图片'
  },
  width: {
    type: String,
    default: 'auto'
  },
  height: {
    type: String,
    default: 'auto'
  },
  InlineBlock: {
    type: Boolean,
    default: false
  }
})

// 是否全屏
const isFullScreen = ref(false);

// 切换全屏状态的方法
const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
};
</script>

<style scoped>
/* 占位 */
.placeholder {
  visibility: hidden;
}

/* 图片基本样式 */
img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out; /* 添加转换效果 */
}

/* 全屏样式 */
.fullScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullScreen img {
  max-width: 90%;
  max-height: 90%;
  animation: zoomIn 0.3s ease-in-out forwards;
}

/* 非全屏样式 */
.reveal {
  display: inline-block;
}

.reveal img {
  animation: zoomOut 0.3s ease-in-out forwards;
}

@keyframes zoomIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes zoomOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>