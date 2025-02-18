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
      <Comment/>
    </div>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import {inject} from "vue";
import PastTop from "@/components/PastTop.vue";
import Comment from "@/components/comment.vue";
// 全局配置
const config = inject('config')
</script>

<style scoped>
/* 内容 */
.content {
  margin-top: 10px;
  background-color: var(--milky-white);
  border-radius: 10px;
  padding: 15px;
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