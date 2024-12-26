<template>
  <component :is="contentComputed.type" v-bind="getAttributes(contentComputed)">
    {{ contentComputed.type === 'Image' ? null : contentComputed.content }}
  </component>
</template>

<script setup>
import {computed} from 'vue';
import Image from "@/components/Image.vue";

const props = defineProps({
  content: String,
  imgWidth: String,
  imgHeight: String,
  imgInlineBlock: Boolean
});

let contentComputed = computed(() => {
  let c = String(props.content)
  let split = c.split(":");

  if (split.length > 2) {
    for (let i = 2; i < split.length; i++) split[1] += (":" + split[i])
  }

  return {
    type: split[0] === 'img' ? Image : split[0],
    isModule: split[0],
    content: split[1]
  };
});

// 获取标签上属性
function getAttributes(c) {
  if (c.isModule === 'img') {
    return {
      src: c.content,
      alt: '假装这里有一张图片',
      width: props.imgWidth,
      height: props.imgHeight,
      InlineBlock: props.imgInlineBlock
    };
  }
  return {};
}
</script>

<style scoped>
* {
  text-align: left;
  margin: 10px 0;
  padding: 0;
  box-sizing: border-box;
  height: 30px;
  line-height: 30px;
}

h1 {
  text-align: center;
  font-size: 25px;
  height: 35px;
  line-height: normal;
}

h2 {
  font-size: 20px;
  border-bottom: 2px solid #ccc;
}

h3 {
  padding-left: 10px;
  border-left: 5px solid #ccc;
}

p {
  height: auto;
  letter-spacing: 1px;
}
</style>
