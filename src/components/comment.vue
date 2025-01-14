<template>
  <Giscus
      id="comments"
      :repo="config.giscus.repo"
      :repoId="config.giscus.repoId"
      :category="config.giscus.category"
      :categoryId="config.giscus.categoryId"
      mapping="pathname"
      term="Welcome to component!"
      inputPosition="top"
      :theme="config.giscus.theme || 'light'"
      lang="zh-CN"
      loading="lazy"
  />
</template>

<script setup>
import Giscus from "@giscus/vue";
import {inject} from "vue";
// 全局配置
const config = inject('config')
</script>


<style scoped>

</style>