<template>
  <component v-for="content in contents" :is="getType(content)" v-bind="getAttributes(content)">
    {{ getType(content) === 'Image' ? null : splitContent(content).content }}
  </component>
</template>

<script setup>
import Image from "@/components/contentView/Image.vue";

const props = defineProps({
  contents: Array,
  imgWidth: String,
  imgHeight: String,
  imgInlineBlock: Boolean
});

// 获取类型
function getType(content) {
  let c = splitContent(content);

  let type;
  switch (c.type) {
    case 'img':
      type = Image;
      break;

    default:
      type = c.type;
  }
  return type;
}

// 获取标签上属性
function getAttributes(content) {
  let c = splitContent(content);
  switch (c.type) {
    case 'img':
      return {
        src: c.content,
        alt: '假装这里有一张图片',
        width: props.imgWidth,
        height: props.imgHeight,
        InlineBlock: props.imgInlineBlock
      }

    default :
      return {}
  }
}

// 分割内容
function splitContent(content) {
  let c = String(content)
  let split = c.split(":");

  // 拼接
  if (split.length > 2) {
    for (let i = 2; i < split.length; i++) split[1] += (":" + split[i])
  }

  return {
    type: split[0],
    content: split[1]
  }
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
