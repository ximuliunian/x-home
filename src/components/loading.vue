<template>
  <div id="loader-wrapper" :class="flag ? 'loaded' : null">
    <div class="loader">
      <div class="loader-circle"></div>
      <div class="loader-text">
        <span class="name">{{ config.name }}</span>
        <span class="tip">加载中......</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
// 全局配置
const config = inject('config')

defineProps(['flag']);
</script>

<style scoped>
#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7); /* 添加背景色保证半透明效果 */

  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .loader-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #6e8efb;
      animation: spin 1.8s linear infinite;
      z-index: 2;

      &:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #a777e3;
        animation: spin-reverse 0.6s linear infinite;
      }

      &:after {
        content: "";
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #5dc1e6;
        animation: spin 1s linear infinite;
      }
    }

    .loader-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      z-index: 2;
      margin-top: 40px;
      font-size: 24px;
      text-align: center;

      .name {
        font-weight: 700;
        margin-bottom: 10px;
        color: #6e8efb;
      }
      
      .tip {
        margin-top: 6px;
        font-size: 18px;
        opacity: 0.8;
        color: #a777e3;
      }
    }
  }

  /* 简化加载完成后的动画效果 */
  &.loaded {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
    
    .loader-circle,
    .loader-text {
      opacity: 0;
      transition: opacity 0.3s ease-out;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>