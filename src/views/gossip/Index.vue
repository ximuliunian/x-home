<template>
  <div class="timeline">
    <PastTop/>
    <Router/>
    <ul v-if="gossipContent.length > 0" class="line">
      <li v-for="item in gossipContent" class="card">
        <div class="time">{{ item.date }}</div>
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
  display: inline-block;
  padding: 5px;
  border-radius: 10px 10px 0px 0;
  background-color: rgba(255, 255, 255, 0.36);
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
}
</style>