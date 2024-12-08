<template>
  <div class="home">
    <div class="aside">
      <Avatar/>
      <motto/>
      <Hitokoto/>
      <Tags/>
      <Directory v-if="false"/>
    </div>

    <div class="main">
      <Welcome/>
      <Router v-if="false"/>
      <SiteNavs/>
      <Skills/>
    </div>
  </div>
</template>

<script setup>
import {inject} from "vue";
import Motto from "@/components/home/sidebar/Motto.vue";
import Directory from "@/components/home/sidebar/Directory.vue";
import Tags from "@/components/home/sidebar/Tags.vue";
import Avatar from "@/components/home/sidebar/Avatar.vue";
import Welcome from "@/components/home/main/Top.vue";
import Router from "@/components/Router.vue";
import SiteNavs from "@/components/home/main/SiteNavs.vue";
import Skills from "@/components/home/main/Skills.vue";
import Hitokoto from "@/components/home/sidebar/Hitokoto.vue";
// 全局配置
const config = inject("config");
</script>

<style scoped>
/* 主体 */
.main {
  width: 100%;
  padding: 0 15px;
}

/* 侧边栏 */
.aside {
  width: 230px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

/* 应用 */
.home {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
}

/* 当屏幕宽度小于 870 时 */
@media only screen and (max-width: 800px) {
  .aside {
    display: none;
  }
}
</style>