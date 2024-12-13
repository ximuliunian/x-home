<template>
  <div v-show="isFullScreen" class="placeholder"></div>
  <div :class="isFullScreen ? 'fullScreen' : 'reveal'" @click="toggleFullScreen">
    <img :alt="alt || '假装这里有一张图片'" :src="src">
  </div>
</template>

<script setup>
import {ref} from "vue";

defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String
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
  height: 50vh;
}

/* 图片基本样式 */
img {
  max-width: 90vw;
  max-height: 90vh;
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
  animation: zoomIn 0.3s ease-in-out forwards;
}

/* 非全屏样式 */
.reveal img {
  width: 100%;
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