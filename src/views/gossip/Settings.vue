<template>
  <div
      class="settings-container"
      @mouseenter="showSettings = true"
      @mouseleave="showSettings = false"
  >
    <!-- 固定定位图标 -->
    <div class="icon-wrapper">
      <icon
          icon="icon-sys-setting"
          class="settings-icon"
          width="30px" height="30px"
      />
    </div>

    <!-- 带过渡效果的选项 -->
    <transition name="slide-fade">
      <ul v-show="showSettings" class="settings-list">
        <li class="setting-item" @click="routerPush('gossipShield')">黑名单</li>
        <li class="setting-item" @click="onlyHostFun">
          只看域主 <input type="checkbox" v-model="onlyHost" disabled>
        </li>
        <li class="setting-item" @click="localStorageClear()">清除缓存</li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import localStorage from "@/composition/localStorage.js";

// 路由
const router = useRouter();

// 路由跳转
function routerPush(name, query) {
  router.push({name: name, query: {...query}});
}

// 显示设置
const showSettings = ref(false);

// 只看域主
const onlyHost = ref(false);

// 自定义事件
const emit = defineEmits(['onlyHost']);

// 只看域主
function onlyHostFun() {
  onlyHost.value = !onlyHost.value;
  emit('onlyHost', onlyHost);
}

// 清除缓存
function localStorageClear() {
  localStorage.clear()
  // 刷新页面
  location.reload()
}
</script>

<style scoped>
.settings-container {
  position: fixed;
  top: 30px;
  right: 20px;
  z-index: 1000;
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
}

.icon-wrapper:hover {
  transform: rotate(120deg);
  background: rgba(255, 255, 255, 1);
}

.settings-list {
  position: absolute;
  top: calc(100% + 15px);
  right: 0;
  min-width: 160px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  margin: 0;
  list-style: none;
  backdrop-filter: blur(10px);
}

.setting-item {
  padding: 12px 20px;
  color: #4a5568;
  transition: all 0.3s;
  cursor: pointer;
  font-weight: 500;
}

.setting-item:hover {
  background: rgba(110, 142, 251, 0.1);
  padding-left: 25px;
  color: #6e8efb;
}

/* 过渡动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>