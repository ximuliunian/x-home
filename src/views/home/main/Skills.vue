<template>
  <Section icon="icon-sys-skills" title="技术栈">
    <img :src="srcLike" alt="技术栈" style="max-width: 100%; border-radius: 12px;"/>
  </Section>
</template>

<script setup>
import Section from "@/components/Section.vue";
import { computed, inject, onMounted, ref } from "vue";
// 全部配置
const config = inject('config')
// URL
const url = 'https://skillicons.dev/icons';
// 展示个数
const perline = ref(17);
// 拼接参数
let srcLike = computed(() => {
  return `${url}?i=${config.skills.list.join(',')}&theme=${config.skills.theme}&perline=${perline.value}`
});

onMounted(() => {
  window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let oldData;

    // 判断屏幕
    if (width < 500) {
      oldData = 10
    } else if (width < 800) {
      oldData = 14
    } else {
      oldData = 17
    }

    // 防止无限切换
    if (oldData !== perline.value) {
      perline.value = oldData;
    }
  });
})
</script>

<style scoped>
img {
  border-radius: 12px;
}
</style>