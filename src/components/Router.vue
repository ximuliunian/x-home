<template>
  <div class="router">
    <RouterLink v-if="isShow(['/'])" to="/">
      <Icon :height="icon.height" :icon="icon.home" :width="icon.width"/>
      主页
    </RouterLink>
    <RouterLink v-if="config.enable.router.comments && isShow(['/comments'])" to="/comments">
      <Icon :height="icon.height" :icon="icon.comment" :width="icon.width"/>
      留言板
    </RouterLink>
    <RouterLink v-if="config.enable.router.timeline && isShow(['/timeline'])" to="/timeline">
      <Icon :height="icon.height" :icon="icon.timeline" :width="icon.width"/>
      时间线
    </RouterLink>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import {inject} from "vue";

const config = inject("config");

// 判断是否显示
function isShow(condition) {
  // 判断传递过来的路径中是否存在相等的，如果存在则返回false
  for (const e of condition) {
    if (window.location.pathname === e) {
      return false;
    }
  }
  return true;
}

let icon = {
  home: 'icon-sys-home',
  comment: 'icon-sys-comment',
  timeline: 'icon-sys-timeline',

  width: '25px',
  height: '25px',
}
</script>

<style scoped>
.router {
  display: flex;
  justify-content: space-between;

  a {
    display: inline-block;
    text-decoration: none;
    padding: 5px;
    margin: 0 10px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    background-size: 200%;
    background-position: 100%;
    border-radius: 10px;
    width: 100%;
  }

  a:hover {
    animation: textFlashes 2s ease-in-out infinite;
  }

}

@keyframes textFlashes {
  0% {
    background-position: 100%;
  }
  25% {
    background-position: 50%;
  }
  50% {
    background-position: 0;
  }
  75% {
    background-position: 50%;
  }
  100% {
    background-position: 100%;
  }
}
</style>