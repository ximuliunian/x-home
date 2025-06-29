<template>
  <component :is="type" :class="['list', type === 'ul' ? 'list--unordered' : 'list--ordered']">
    <li v-for="(content, index) in contents" :key="index">{{ content }}</li>
  </component>
</template>

<script setup>
import { defineProps } from "vue";

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
  margin: 15px 0;
  padding-left: 1.5em;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #4a5568;
  transition: all 0.3s ease;
}

/* 无序列表样式 */
.list--unordered {
  list-style-type: none;
  padding-left: 0;
}

.list--unordered li {
  position: relative;
  padding-left: 2em;
  margin-bottom: 0.8em;
  transition: all 0.3s ease;
}

.list--unordered li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 0.6em;
  height: 0.6em;
  background-color: #6e8efb;
  border-radius: 50%;
  box-shadow: 0 0 0 0.2em white inset;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

/* 有序列表样式 */
.list--ordered {
  list-style-type: none;
  padding-left: 0;
  counter-reset: item;
}

.list--ordered li {
  position: relative;
  padding-left: 2.5em;
  margin-bottom: 0.8em;
  transition: all 0.3s ease;
}

.list--ordered li::before {
  counter-increment: item;
  content: counter(item) '.';
  position: absolute;
  left: 0;
  font-weight: bold;
  color: #a777e3;
  transition: color 0.3s ease;
  width: 1.5em;
  text-align: right;
}

/* 鼠标悬停效果 */
.list--unordered li:hover {
  transform: translateX(5px);
}

.list--unordered li:hover::before {
  transform: scale(1.2);
  background-color: #a777e3;
}

.list--ordered li:hover {
  transform: translateX(5px);
}

.list--ordered li:hover::before {
  color: #6e8efb;
}
</style>