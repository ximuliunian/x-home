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
import config from 'virtual:yaml-config';

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
#comments {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

#comments:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>