<template>
  <Giscus
      id="comments"
      :repo="repo || config.giscus.repo"
      :repoId="repoId || config.giscus.repoId"
      :category="category || config.giscus.category"
      :categoryId="categoryId || config.giscus.categoryId"
      :mapping="mapping"
      :term="term"
      inputPosition="top"
      :theme="config.giscus.theme || 'light'"
      lang="zh-CN"
      crossorigin="anonymous"
      loading="lazy"
      emit-metadata="0"
      reactions-enabled="1"
      async
  />
</template>

<script setup>
import Giscus from "@giscus/vue";
import {inject} from "vue";
// 全局配置
const config = inject('config')

const props = defineProps({
  mapping: {
    type: String,
    default: 'pathname'
  },
  repo: String,
  repoId: String,
  category: String,
  categoryId: String,
  term: String,
})
</script>

<style scoped>

</style>