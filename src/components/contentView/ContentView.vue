<template>
  <component v-for="content in contentList" :is="getElementType(content.tag)" v-bind="content.attributes">
    {{ content.text }}
  </component>
</template>

<script setup>
import Image from "@/components/contentView/Image.vue";
import {onMounted, ref} from "vue";
import LiView from "@/components/contentView/LiView.vue";

const props = defineProps({
  contents: {
    type: Array,
    required: true
  },
  imgWidth: String,
  imgHeight: String,
  imgInlineBlock: Boolean
});

// 展示内容列表
let contentList = ref([]);

onMounted(() => {
  for (let i = 0; i < props.contents?.length; i++) {
    let content = props.contents[i];
    // 渲染元素
    let el = {
      tag: getType(content),
      text: getContent(content)
    }

    // 处理有/无序列表
    if (LiView === getElementType(content)) {
      // 构建属性元素
      el.attributes = {
        type: el.tag,
        contents: []
      };
      // 接着现有的i继续循环直到循环结束或者下一个标签和构建的属性标签不一致
      for (; i < props.contents.length && el.tag === getType(props.contents[i]); i++) {
        el.attributes.contents.push(getContent(props.contents[i]));
      }
      // 提交
      i--;
      addContent(el)
      continue
    }

    el.attributes = getAttributes(content)
    addContent(el);
  }
})


// 添加对象到列表
function addContent(content) {
  contentList.value.push(content);
}

// 获取内容
function getContent(content) {
  return splitContent(content).content;
}

// 获取标签原始类型
function getType(content) {
  return splitContent(content).type;
}

// 获取元素类型
function getElementType(content) {
  let c = getType(content);

  let type;
  switch (c) {
    case 'img':
      type = Image;
      break;

    case 'ol':
    case 'ul':
      type = LiView;
      break;

    default:
      type = c;
  }
  return type;
}

// 获取标签上属性
function getAttributes(content) {
  let type = getElementType(content);
  switch (type) {
    case Image:
      return {
        src: getContent(content),
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
