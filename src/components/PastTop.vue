<template>
  <div class="floating-buttons">
    <button class="float-btn back" @click="goBack" title="返回上一级">
      <Icon icon="icon-sys-fanhui" width="20px" height="20px"/>
    </button>
    <button class="float-btn top" @click="scrollToTop" title="回到顶部">
      <Icon icon="icon-sys-dingbu" width="20px" height="20px"/>
    </button>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

// 回到上一页
const goBack = () => {
  window.history.back()
}

// 回到顶部
const scrollToTop = () => {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({top: 0, behavior: 'smooth'})
  } else {
    // 兼容旧版浏览器
    const scrollStep = -window.scrollY / 15
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep)
      } else {
        clearInterval(scrollInterval)
      }
    }, 15)
  }
}
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
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  color: #6e8efb;
  border-radius: 50%;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.float-btn:hover {
  color: white;
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
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