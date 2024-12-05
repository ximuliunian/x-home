<template>
  <div :style="closeWidth ? null : {width: width}" class="container">
    <div v-if="!closeTitle" class="title">{{ title }}</div>
    <div :style="{height: height}" class="content">
      <slot/>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // 标题
  title: {
    type: String,
  },
  // 宽度
  width: {
    type: String,
    default: '100%'
  },
  // 高度
  height: {
    type: String,
    default: 'auto'
  },
  // 消失宽度
  disappearWidth: {
    type: String,
    default: '0px'
  },
  // 关闭标题
  closeTitle: {
    type: Boolean,
    default: false
  },
  // 关闭宽度
  closeWidth: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
/* 容器 */
.container {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  margin-bottom: 20px;
  padding: 7px;
  border: 1px solid #6e6e6e;
}

/* 标题 */
.title {
  display: block;
  border-left: #6e6e6e 5px solid;
  padding-left: 10px;
  height: 20px;
  line-height: 20px;
  font-weight: bold;
}

/* 内容 */
.content {
  position: relative;
}
</style>