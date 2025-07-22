<template>
  <div class="comment">
    <PastTop/>
    <div :style="{backgroundImage: 'url(' + config._comment.cover + ')'}" v-if="config.enable.comments.banner" class="header">
      <div v-if="config.enable.comments.bannerText">
        <h1>{{ config._comment.title }}</h1>
        <p>{{ config._comment.description }}</p>
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
import PastTop from "@/components/PastTop.vue";
import Comment from "@/components/comment.vue";
import config from 'virtual:yaml-config';
</script>

<style scoped>
/* 内容 */
.content {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 头部 */
.header {
  width: 100%;
  height: 40vh;
  margin-bottom: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  div {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
    border-radius: 12px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;

    h1 {
      color: #fff;
      margin-bottom: 15px;
      font-size: 2.5rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }

    p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.2rem;
      max-width: 800px;
      transition: all 0.3s ease;
    }
  }
}

.header:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.header:hover div h1 {
  transform: scale(1.05);
}

/* 留言板 */
.comment {
  width: 80%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .comment {
    width: 95%;
  }
  
  .header {
    height: 30vh;
    
    div {
      padding: 15px;
      
      h1 {
        font-size: 1.8rem;
      }
      
      p {
        font-size: 1rem;
      }
    }
  }
}
</style>