<template>
  <PastTop/>
  <div class="friendLinks">
    <div class="description">
      <h1 style="border-bottom: 3px dashed #ccc; padding-bottom: 10px">
        <Icon icon="icon-sys-ya" height="38px" width="38px"/>
        友人帐
      </h1>
      <div class="description-content">
        <ContentView :contents="friendLinks.apply.description" img-height="200px" img-inline-block/>
      </div>
    </div>

    <Router/>

    <Section :title="item.sort" :icon="item.icon" v-for="(item, key) in list" :key="key">
      <div class="links-container">
        <div class="links" :style="{ backgroundColor: list.bgColor }" v-for="(list, index) in item.list" :key="index"
             @click="openLink(list.url, true)">
          <img :src="list.avatar" alt="假装有一张图片">
          <div class="info">
            <span>{{ list.name }}</span>
            <span>{{ list.desc }}</span>
          </div>
        </div>
        <i v-for="i in 2" class="placeholder"></i>
      </div>
    </Section>

    <div class="description">
      <h1 style="border-bottom: 3px dashed #ccc; padding-bottom: 10px">
        <Icon icon="icon-sys-geshi" height="38px" width="38px"/>
        信息
      </h1>
      <div class="description-content">
        <div class="table-container">
          <table>
            <tr>
              <th>字段</th>
              <th>是否必填</th>
              <th>内容</th>
            </tr>
            <tr>
              <td>名称</td>
              <td>是</td>
              <td>{{ friendLinks.apply.scheme.name }}</td>
            </tr>
            <tr>
              <td>简介</td>
              <td>是</td>
              <td>{{ friendLinks.apply.scheme.desc }}</td>
            </tr>
            <tr>
              <td>链接</td>
              <td>是</td>
              <td>{{ friendLinks.apply.scheme.url }}</td>
            </tr>
            <tr>
              <td>头像</td>
              <td>是</td>
              <td>{{ friendLinks.apply.scheme.avatar }}</td>
            </tr>
            <tr>
              <td>背景颜色</td>
              <td>否</td>
              <td>{{ friendLinks.apply.scheme.bgColor }}</td>
            </tr>
          </table>
        </div>
      </div>
      <h1 style="border-bottom: 3px dashed #ccc; padding-bottom: 10px">
        <Icon icon="icon-sys-yaoqiu" height="38px" width="38px"/>
        申请要求
      </h1>
      <div class="description-content">
        <ContentView :contents="friendLinks.apply.require" img-height="200px" img-inline-block/>
      </div>
    </div>

    <div class="description">
      <Comment/>
    </div>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import Icon from "@/components/Icon.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import {friendLinks} from "../../../config/FriendLinks.js";
import {inject, onMounted, reactive, ref} from "vue";
import Section from "@/components/Section.vue";
import PastTop from "@/components/PastTop.vue";
import commonlyFunctions from "@/composition/commonlyFunctions.js";
import {getFriendLink, getSorted} from "@/api/friendLinkAPI.js";
import Comment from "@/components/comment.vue";

const {openLink} = commonlyFunctions();
// 全局配置
const config = inject("config");
// 友链列表
const list = reactive([]);
// 分组
const links = ref({});

onMounted(() => {
  // 遍历所有分类
  links.notSorted = {sort: '小伙伴们', icon: 'icon-sys-ya', list: []}
  friendLinks.links.forEach(link => links[link.sort] = {...link, list: []})

  getFriendLink().then(respFriendLink => {
    for (const e of respFriendLink) {
      getSorted(e).then(resp => {
        let sort = e.split('.')[0].split('-')[0];
        addList(sort, resp, list.some(fl => fl.sort == sort))
      })
    }
  })
});

// 添加元素到list
function addList(sort, array, isCreate) {
  // 判断这个分类是否已经存在
  if (isCreate) {
    // 存在则加入
    for (let listKey in list) {
      if (list[listKey].sort == sort) {
        list[listKey].list.push(...array);
      }
    }
  } else {
    // 不存在则创建
    let e = links[sort];
    e.list.push(...array);
    list.push(e);
  }
}
</script>

<style scoped>
/* 信息 */
.info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;

  span:first-child {
    font-weight: bold;
  }
}

/* 占位符 */
.placeholder {
  width: 33%;
}

/* 链接 */
.links {
  width: 33%;
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #8d8d8d;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #595959;
  background-color: var(--milky-white);

  &:hover {
    background-color: #8d8d8d !important;
    color: #fff;
  }

  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
}

/* 链接容器 */
.links-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* 表格容器 */
.table-container {
  overflow-x: auto;
}

.table-container::-webkit-scrollbar {
  -ms-overflow-style: auto;
  /* IE and Edge */
  scrollbar-width: auto;
  /* Firefox */
  height: 8px;
  /* 滚动条高度 */
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* 滚动条轨道背景色 */
}

.table-container::-webkit-scrollbar-thumb {
  background: #888;
  /* 滚动条滑块背景色 */
  border-radius: 4px;
  /* 滑块圆角 */
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* 滑块悬停时的背景色 */
}

/* 表格 */
table {
  width: auto;
  border-collapse: collapse;
  margin-bottom: 10px;
  min-width: 100%;
}

th,
td {
  padding: 8px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  user-select: text;
}

/* 描述内容 */
.description-content {
  margin-top: 10px;
  font-size: 18px;
}

/* 描述 */
.description {
  background-color: var(--milky-white);
  border-radius: 10px;
  padding: 15px;
  margin: 20px 0;
}

/* 友链 */
.friendLinks {
  width: 80%;
  margin: 0 auto;
}

/* 当屏幕宽度小于 800 时 */
@media only screen and (max-width: 800px) {
  .links {
    width: 49%;
  }

  .placeholder {
    width: 49%;
  }
}

/* 当屏幕宽度小于 500 时 */
@media only screen and (max-width: 500px) {
  .links {
    width: 100%;
  }
}
</style>