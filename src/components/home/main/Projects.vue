<template>
  <Section v-if="config.projects.enable" icon="icon-sys-project" title="项目">
    <div class="projects">
      <Container v-for="(item, key) in config.projects.info" :key="key" class="project" close-title
                 close-width @click="openLink(item.url, true)">
        <div class="title">
          <Icon :icon="item.icon" height="30px" width="30px"/>
          <span style="margin-left: 5px">{{ item.name }}</span>
        </div>
        <div :title="item.description" class="description">{{ item.description }}</div>
      </Container>
      <i v-for="i in 3" class="placeholder"></i>
    </div>
  </Section>
</template>

<script setup>
import Section from "@/components/home/Section.vue";
import {inject} from "vue";
import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";
import commonlyFunctions from "@/composition/commonlyFunctions.js";
// 通用函数
const {openLink} = commonlyFunctions();
// 全局配置
const config = inject('config')
</script>

<style scoped>
/* 站内导航 */
.projects {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* 站点 */
.project {
  width: 24%;
  transition: width 0.3s;
  margin-bottom: 10px;
  font-weight: bold;
  color: #2a2727;
  cursor: pointer;
}

/* 占位符 */
.placeholder {
  width: 24%;
}

/* 标题 */
.title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 描述 */
.description {
  margin-top: 10px;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #48525c;
}

/* 当屏幕宽度小于 910 时 */
@media only screen and (max-width: 910px) {
  /* 站点 */
  .project {
    width: 49%;
    transition: width 0.3s;
  }

  /* 占位符 */
  .placeholder {
    width: 49%;
  }
}

/* 当屏幕宽度小于 500 时 */
@media only screen and (max-width: 500px) {
  /* 站点 */
  .project {
    width: 100%;
    transition: width 0.3s;
  }
}
</style>