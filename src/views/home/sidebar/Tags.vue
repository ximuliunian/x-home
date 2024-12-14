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
import {inject, onMounted, ref} from 'vue';
import useLCG from "@/composition/useLCG.js";
import Container from "@/components/Container.vue";

// 标题
const title = '标签';
// 宽度
const width = '100%';
// 高度
const height = '160px';

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
  }, 2000); // 每2秒生成一条新弹幕

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
  padding: 3px 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  position: absolute;
  top: 50%;
  left: 100%;
  white-space: nowrap;
  animation: moveLeft 10s linear;
  animation-fill-mode: forwards;
}

@keyframes moveLeft {
  from {
    left: 100%;
    transform: translateX(0);
  }
  to {
    left: -100%;
    transform: translateX(0);
  }
}
</style>