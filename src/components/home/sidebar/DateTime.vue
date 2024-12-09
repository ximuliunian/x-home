<template>
  <container height="auto" title="时钟" width="100%">
    <div class="time">
      <div class="date">
        <span>
          {{ currentTime.year }}&nbsp;年&nbsp;{{ currentTime.month }}&nbsp;月&nbsp;{{ currentTime.day }}&nbsp;日
        </span>
        <span class="sm-hidden" style="margin-left: 5px">{{ currentTime.weekday }}</span>
      </div>
      <div class="text">
        <span> {{ currentTime.hour }}:{{ currentTime.minute }}:{{ currentTime.second }}</span>
      </div>
    </div>
  </container>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import Container from "@/components/Container.vue";

// 时钟
const getCurrentTime = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
  let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][time.getDay()];
  return {year, month, day, hour, minute, second, weekday};
};

// 当前时间
const currentTime = ref({});
const timeInterval = ref(null);

// 更新时间
const updateTimeData = () => {
  currentTime.value = getCurrentTime();
};

onMounted(() => {
  updateTimeData();
  timeInterval.value = setInterval(updateTimeData, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval.value);
});
</script>

<style scoped>
.time {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.date {
  font-size: 13px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.text {
  font-size: 2.5rem;
  font-weight: bold;
}
</style>
