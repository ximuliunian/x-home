<template>
  <div class="home">
    <div class="aside">
      <Avatar/>
      <motto/>
      <Hitokoto/>
      <Tags/>
      <DateTime/>
    </div>

    <div class="main">
      <Welcome/>
      <Router v-if="false"/>
      <SiteNavs/>
      <Projects/>
      <Skills/>
    </div>
  </div>
</template>

<script setup>
import {inject} from "vue";
import Motto from "@/views/home/sidebar/Motto.vue";
import Tags from "@/views/home/sidebar/Tags.vue";
import Avatar from "@/views/home/sidebar/Avatar.vue";
import Welcome from "@/views/home/main/Top.vue";
import Router from "@/components/Router.vue";
import SiteNavs from "@/views/home/main/SiteNavs.vue";
import Skills from "@/views/home/main/Skills.vue";
import Hitokoto from "@/views/home/sidebar/Hitokoto.vue";
import Projects from "@/views/home/main/Projects.vue";
import DateTime from "@/views/home/sidebar/DateTime.vue";
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