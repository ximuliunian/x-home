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
}

/* 路由 */
.routing {
  width: 30%;
  display: inline-block;
  text-decoration: none;
  padding: 5px;
  margin: 10px 0;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-size: 200%;
  background-position: 100%;
  border-radius: 10px;
  transition: width 0.3s;
}

/* 鼠标悬浮时 */
.routing:hover {
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
    width: 49%;
    transition: width 0.3s;
  }

  /* 占位符 */
  .placeholder {
    width: 49%;
    display: block;
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