<template>
  <div class="router">
    <RouterLink v-if="isShow(['/'])" to="/" class="routing">
      <Icon :height="icon.height" :icon="icon.home" :width="icon.width"/>
      主页
    </RouterLink>
    <RouterLink v-if="config.enable.router.comments && isShow(['/comments'])" to="/comments" class="routing">
      <Icon :height="icon.height" :icon="icon.comment" :width="icon.width"/>
      留言板
    </RouterLink>
    <RouterLink v-if="config.enable.router.gossip && isShow(['/gossip'])" to="/gossip" class="routing">
      <Icon :height="icon.height" :icon="icon.gossip" :width="icon.width"/>
      闲言碎语
    </RouterLink>
    <RouterLink v-if="config.enable.router.friendLinks && isShow(['/friendLinks'])" to="/friendLinks" class="routing">
      <Icon :height="icon.height" :icon="icon.friendLinks" :width="icon.width"/>
      友链
    </RouterLink>
    <i class="placeholder"></i>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import config from 'virtual:yaml-config';

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
  gossip: 'icon-sys-gossip',
  friendLinks: 'icon-sys-friendLinks',

  width: '25px',
  height: '25px',
}
</script>

<style scoped>
/* 路由器 */
.router {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px 0;
}

/* 路由 */
.routing {
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 15px 20px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  background-size: 200%;
  background-position: 100%;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 鼠标悬浮时 */
.routing:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  animation: textFlashes 2s ease-in-out infinite;
}

/* 占位符 */
.placeholder {
  display: none;
}

/* 当屏幕宽度小于 800 时 */
@media only screen and (max-width: 800px) {
  /* 路由 */
  .routing {
    min-width: 45%;
    transition: all 0.3s;
  }

  /* 占位符 */
  .placeholder {
    display: none;
  }
}

@media only screen and (max-width: 500px) {
  .routing {
    min-width: 100%;
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