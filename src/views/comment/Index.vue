<template>
  <div class="comment">
    <PastTop/>
    <div :style="{backgroundImage: 'url(' + config.comment.cover + ')'}" class="header">
      <div>
        <h1>{{ config.comment.title }}</h1>
        <p>{{ config.comment.description }}</p>
      </div>
    </div>
    <Router/>
    <div class="content">
      <div class="giscus"></div>
      <component
          is="script"
          :data-category="config.giscus.category"
          :data-category-id="config.giscus.categoryId"
          :data-repo="config.giscus.repo"
          :data-repo-id="config.giscus.repoId"
          :data-theme="config.giscus.theme || 'light'"
          async
          crossorigin="anonymous"
          data-emit-metadata="0"
          data-input-position="top"
          data-lang="zh-CN"
          data-mapping="pathname"
          data-reactions-enabled="1"
          data-strict="0"
          src="https://giscus.app/client.js">
      </component>
    </div>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import {inject} from "vue";
import PastTop from "@/components/PastTop.vue";

const config = inject('config')
</script>

<style scoped>
/* 内容 */
.content {
  margin-top: 10px;
  background-color: rgba(255, 255, 240);
  border-radius: 10px;
  padding: 10px;
}

/* 头部 */
.header {
  width: 100%;
  height: 30vh;
  margin-bottom: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;

  div {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;

    h1 {
      color: #fff;
      margin-bottom: 10px;
    }

    p {
      color: #fff9f9;
      font-size: 20px;
    }
  }
}

/* 留言板 */
.comment {
  width: 80%;
  margin: 0 auto;
}
</style>