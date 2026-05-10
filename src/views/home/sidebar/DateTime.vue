<template>
    <container height="auto" title="时钟" width="100%">
        <div class="time">
            <div class="date">
                <span>
                    {{ currentTime.year }}&nbsp;年&nbsp;{{
                        currentTime.month
                    }}&nbsp;月&nbsp;{{ currentTime.day }}&nbsp;日
                </span>
                <span class="sm-hidden" style="margin-left: 5px">{{
                    currentTime.weekday
                }}</span>
            </div>
            <div class="text">
                <span>
                    {{ currentTime.hour }}:{{ currentTime.minute }}:{{
                        currentTime.second
                    }}</span
                >
            </div>
        </div>
    </container>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Container from "@/components/Container.vue";

interface CurrentTime {
    year: number;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    weekday: string;
}

const getCurrentTime = (): CurrentTime => {
    const time = new Date();
    const year = time.getFullYear();
    const month =
        time.getMonth() + 1 < 10
            ? "0" + (time.getMonth() + 1)
            : String(time.getMonth() + 1);
    const day =
        time.getDate() < 10 ? "0" + time.getDate() : String(time.getDate());
    const hour =
        time.getHours() < 10 ? "0" + time.getHours() : String(time.getHours());
    const minute =
        time.getMinutes() < 10
            ? "0" + time.getMinutes()
            : String(time.getMinutes());
    const second =
        time.getSeconds() < 10
            ? "0" + time.getSeconds()
            : String(time.getSeconds());
    const weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
    ][time.getDay()];
    return { year, month, day, hour, minute, second, weekday };
};

const currentTime = ref<CurrentTime>(getCurrentTime());
let timeInterval: ReturnType<typeof setInterval> | null = null;

const updateTimeData = (): void => {
    currentTime.value = getCurrentTime();
};

onMounted(() => {
    updateTimeData();
    timeInterval = setInterval(updateTimeData, 1000);
});

onBeforeUnmount(() => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
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
    transition: all 0.3s ease;
}

.date {
    font-size: 16px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
    color: #4a5568;
}

.text {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: #2d3748;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.container:hover .text {
    transform: scale(1.05);
    color: #1a202c;
}
</style>
