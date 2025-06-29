<template>
  <container :height="height" :title="title" :width="width">
    <span
        v-for="(item, index) in barrageList"
        :key="index"
        :data-id="item.text + item.top"
        :style="{ top: item.top + 'px' }"
        class="tags-content"
        @animationend="removeBarrage($event, item.text+item.top)"
        @blur="removeBarrage($event, item.text+item.top)">
      {{ item.text }}
    </span>
  </container>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import useLCG from "@/composition/useLCG.js";
import Container from "@/components/Container.vue";

// 标题
const title = '标签';
// 宽度
const width = '100%';
// 高度
const height = '160px';
// 弹幕生成时间
const barrageTime = 1500;

// 全局配置
const config = inject('config');
// 弹幕列表
const barrageList = ref([]);
// 伪随机数生成
const {randomInt} = useLCG();

// 上一次弹幕的位置
let lastPosition = 0;
// 上一次弹幕的下标
let lastIndex = 0;
// 容器高度
const containerHeight = 160;

// 创建弹幕元素
function createBarrage() {
  // 获取弹幕数据
  let index = randomInt(0, config.tags.length - 1);
  while (index === lastIndex) {
    index = randomInt(0, config.tags.length - 1);
  }
  lastIndex = index;
  const text = config.tags[index];

  // 获取展示位置
  let position = randomInt(0, (containerHeight - 30));
  // 弹幕高度大概在30左右，如果这次生成的位置和上一次的位置差不多，就重新生成
  while (Math.abs(position - lastPosition) < 30) {
    position = randomInt(0, (containerHeight - 30));
  }
  lastPosition = position;

  barrageList.value.push({id: text + position, text, top: position});
}

// 移除弹幕元素
function removeBarrage(event, dataId) {
  let el = event.target;
  if (el.dataset.id === dataId) {
    el.remove();
  }
}

onMounted(() => {
  createBarrage();

  setInterval(() => {
    createBarrage();
  }, barrageTime);

  // 切换窗口时清空弹幕
  window.onblur = (e) => {
    barrageList.value = [];
  }
  // 切换窗口时清空弹幕
  window.onfocus = (e) => {
    barrageList.value = [];
  }
});
</script>

<style scoped>
.tags-content {
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border-radius: 50px;
  position: absolute;
  top: 50%;
  left: 100%;
  white-space: nowrap;
  animation: moveLeft 10s linear;
  animation-fill-mode: forwards;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 5;
}

.tags-content:hover {
  transform: scale(1.1);
  z-index: 10;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

@keyframes moveLeft {
  from {
    left: 105%;
    transform: translateX(0);
  }
  to {
    left: -100%;
    transform: translateX(0);
  }
}
</style>