<template>
  <div class="timeline">
    <Router id="top"/>
    <ul v-if="configTimeline.length > 0" class="line">
      <li v-for="item in configTimeline" class="card">
        <div class="time">{{ item.date }}</div>
        <div class="content">
          <ContentView v-for="c in item.content" :content="c"/>
        </div>
      </li>
    </ul>
    <div v-else class="cover">
      <div>暂时什么都还没有哦</div>
    </div>
    <a id="pastTop" href="#top" title="回到顶部">↑</a>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import {inject} from "vue";
import ContentView from "@/components/ContentView.vue";

const configTimeline = inject('configTimeline')
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

/* 回到顶部 */
#pastTop {
  position: fixed;
  width: 30px;
  height: 30px;
  bottom: 30px;
  right: 10px;
  background-color: white;
  text-decoration: none;
  text-align: center;
  line-height: 30px;
  font-weight: bolder;
  font-size: 20px;
  color: black;
  border-radius: 10px;
  transition: background-color 0.5s, color 0.5s;
}

/* 内容 */
.content {
  width: 100%;
  background-color: rgba(110, 110, 110, 0.3);
  padding: 5px;
  border-radius: 0 10px 10px 10px;

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