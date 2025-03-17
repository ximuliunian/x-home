<template>
  <div class="button-group">
    <button class="button" @click="goBack" title="返回上一级">←</button>
    <button class="button" @click="scrollToTop" title="回到顶部">↑</button>
  </div>
</template>

<script setup>

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
/* 按钮容器 */
.button-group {
  position: fixed;
  bottom: 30px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
}

/* 基础按钮样式 */
.button {
  --size: 30px;
  --bg-color: white;
  --text-color: black;

  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  color: var(--text-color);
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background-color 0.3s ease,
  color 0.3s ease,
  transform 0.2s ease;
}

/* 悬停效果 */
.button:hover {
  --bg-color: #333;
  --text-color: white;
  transform: translateY(-2px);
}

/* 不同功能按钮的扩展样式（示例） */
.button.back {
  font-size: 20px;
}

.button.top {
  font-size: 22px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .button-group {
    bottom: 30px;
    right: 8px;
  }

  .button {
    --size: 28px;
    font-size: 16px;
  }
}
</style>