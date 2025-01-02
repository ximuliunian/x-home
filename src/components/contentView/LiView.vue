<template>
  <component :is="type" :class="['list', type === 'ul' ? 'list--unordered' : 'list--ordered']">
    <li v-for="(content, index) in contents" :key="index">{{ content }}</li>
  </component>
</template>

<script setup>
import {defineProps} from "vue";

// 定义props
const props = defineProps({
  contents: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['ul', 'ol'].includes(value) // 确保type只能是'ul'或'ol'
  }
});
</script>

<style scoped>
/* 通用列表样式 */
.list {
  height: auto;
  margin: 0;
  padding-left: 1.5em; /* 根据需要调整缩进 */
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6; /* 行高 */
  color: #333; /* 深灰色文字 */
}

/* 无序列表样式 */
.list--unordered {
  list-style-type: none; /* 移除默认项目符号 */
  padding-left: 0;
}

.list--unordered li {
  position: relative;
  padding-left: 2em; /* 为自定义标记留出空间 */
  margin-bottom: 0.5em; /* 列表项之间的间距 */
}

.list--unordered li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.2em;
  width: 0.6em;
  height: 0.6em;
  background-color: #007bff; /* 蓝色背景 */
  border-radius: 50%;
  box-shadow: 0 0 0 0.2em white inset;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

/* 有序列表样式 */
.list--ordered {
  list-style-type: none; /* 移除默认编号 */
  padding-left: 0;
  counter-reset: item; /* 创建计数器 */
}

.list--ordered li {
  position: relative;
  padding-left: 2em; /* 为自定义编号留出更多空间 */
  margin-bottom: 0.5em; /* 列表项之间的间距 */
}

.list--ordered li::before {
  counter-increment: item;
  content: counter(item) '. ';
  position: absolute;
  left: 0;
  font-weight: bold;
  color: #dc3545; /* 红色编号 */
  transition: color 0.3s ease;
}

/* 鼠标悬停效果 */
.list--unordered li:hover::before {
  transform: scale(1.2); /* 放大 */
  background-color: #28a745; /* 悬停时变为绿色 */
}

.list--ordered li:hover::before {
  color: #007bff; /* 悬停时变为蓝色 */
}
</style>