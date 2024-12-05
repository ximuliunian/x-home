<template>
  <div class="section">
    <Icon :icon="icon" height="40px" width="40px"/>
    <span style="margin-left: 10px">{{ title }}</span>
  </div>
  <div class="content">
    <slot/>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
/* 标题 */
.section {
  margin: 10px 0;
  padding: 5px 0;
  display: flex;
  align-items: center;
  border-bottom: 3px dashed #fff;
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
}

/* 内容 */
.content {
  position: relative;
}
</style>