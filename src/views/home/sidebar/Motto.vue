<template>
  <container height="auto" title="座右铭" width="100%">
    <div class="motto-content">
      <span class="motto-content-top">{{ config.motto.top }}</span>
      <span class="motto-content-bottom">{{ config.motto.bottom }}</span>
    </div>
  </container>
</template>

<script setup>
import Container from "@/components/Container.vue";
import {inject} from "vue";
// 全局配置
const config = inject("config");
</script>

<style scoped>
/* 座右铭 */
.motto-content {
  padding: 10px 5px;
  font-size: 18px;
}

/* 上文 */
.motto-content-top {
  float: left;
  margin-bottom: 10px;
}

/* 下文 */
.motto-content-bottom {
  float: right;
  margin-bottom: 10px;
}
</style>