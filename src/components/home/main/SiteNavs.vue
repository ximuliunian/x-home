<template>
  <Section v-if="config.siteNavs.enable" icon="icon-sys-nav" title="站内导航">
    <div class="sites">
      <Container v-for="(item, key) in config.siteNavs.info" :key="key" class="site" close-title close-width
                 @click="openLink(item.url)">
        <div style="display: flex;align-items: center;">
          <Icon :icon="item.icon" height="30px" width="30px"/>
          <span style="margin-left: 10px">{{ item.name }}</span>
        </div>
      </Container>
    </div>
  </Section>
</template>

<script setup>
import Section from "@/components/home/Section.vue";
import {inject} from "vue";
import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";

const config = inject('config')

// 新页面打开链接
function openLink(url) {
  window.open(url, '_blank');
}
</script>

<style scoped>
/* 站内导航 */
.sites {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* 站点 */
.site {
  width: 24%;
  margin-bottom: 10px;
  font-weight: bold;
  color: #2a2727;
  cursor: pointer;
}

/* 当屏幕宽度小于 800 时 */
@media only screen and (max-width: 800px) {
  /* 站点 */
  .site {
    width: 49%;
  }
}
</style>