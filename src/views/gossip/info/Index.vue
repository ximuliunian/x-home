<template>
  <div class="gossipInfo">
    <div class="header">
      <div class="header-left">
        <Image src="https://www.ximuliunian.top/img/avatar.png" alt="假装这里有一张图片" width="50px" height="50px"/>
        &bullet;
        <span>{{ '懒惰往往是创新的催化剂' }}</span>
      </div>

      <button class="header-right">
        前往主页
        <Icon icon="icon-sys-qianwang" width="25px" height="25px"/>
      </button>
    </div>

    <div class="content">
      <ContentView contents=""/>
    </div>

    <div class="comment">
      <Comment/>
    </div>
  </div>
</template>

<script setup>

import Image from "@/components/contentView/Image.vue";
import Icon from "@/components/Icon.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import Comment from "@/components/comment.vue";
</script>

<style scoped>
/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.36);
  border-radius: 5px;

  .header-left {
    display: flex;
    align-items: center;
    border-radius: 50px;
  }
}

/* 容器 */
.gossipInfo {
  margin: 0 auto;
  width: 80%;
  min-width: 300px;
  padding: 5px;
}
</style>