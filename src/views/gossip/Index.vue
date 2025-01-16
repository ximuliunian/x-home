<template>
  <div class="timeline">
    <PastTop/>
    <Router/>
    <ul v-if="gossipContent.length > 0" class="line">
      <li v-for="item in gossipContent" class="card">
        <div class="articleInfo">
          <div class="author">
            <img src="https://www.ximuliunian.top/img/avatar.png">
            <span>曦暮流年</span>
          </div>
          <div class="time">{{ item.date }}</div>
        </div>
        <div class="content">
          <ContentView :contents="item.content"/>
        </div>
      </li>
    </ul>
    <div v-else class="cover">
      <div>暂时什么都还没有哦</div>
    </div>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import gossipContent from "../../../config/GossipContent.js";
import PastTop from "@/components/PastTop.vue";
</script>

<style scoped>
/* 覆盖 */
.cover {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  div {
    font-size: 30px;
    font-weight: bolder;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    background-color: rgba(110, 110, 110, 0.3);
    padding: 10px;
    border-radius: 10px;
  }
}

/* 内容 */
.content {
  width: 100%;
  background-color: rgb(22 22 22 / 30%);;
  padding: 5px;
  border-radius: 0 10px 10px 10px;
  color: #fff;

  img {
    width: 80%;
  }
}

/* 时间 */
.time {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 0 10px 0 0;
  background-color: rgba(255, 255, 255, 0.36);
}

/* 作者 */
.author {
  display: flex;
  align-items: center;
  max-width: 50%;
  padding: 5px;
  border-radius: 10px 0 0 0;
  border-right: 2px dashed rgba(0, 0, 0, 0.31);
  background-color: rgba(255, 255, 255, 0.36);

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  span {
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* 文章信息 */
.articleInfo {
  display: flex;
}

/* 时间线 */
.line {
  border-left: 5px solid rgba(0, 0, 0, 0.31);
}

/* 卡片 */
.card {
  margin: 10px;
  list-style: none;
}

/* 卡片左侧小圆点 */
.card::before {
  content: '';
  display: block;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: white;
  position: relative;
  left: -19px;
  top: 35px;
}

/* 时间轴 */
.timeline {
  margin: 0 auto;
  width: 80%;
  min-width: 300px;
  padding: 5px;
}
</style>