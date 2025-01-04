<template>
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
      <div class="giscus"></div>
      <component
          is="script"
          :data-category="config.giscus.category"
          :data-category-id="config.giscus.categoryId"
          :data-repo="config.giscus.repo"
          :data-repo-id="config.giscus.repoId"
          :data-theme="config.giscus.theme || 'light'"
          async
          crossorigin="anonymous"
          data-emit-metadata="0"
          data-input-position="top"
          data-lang="zh-CN"
          data-mapping="pathname"
          data-reactions-enabled="1"
          data-strict="0"
          src="https://giscus.app/client.js">
      </component>
    </div>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import Icon from "@/components/Icon.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import {friendLinks} from "../../../config/FriendLinks.js";
import {inject} from "vue";

const config = inject("config");
</script>

<style scoped>
/* 表格容器 */
.table-container {
  overflow-x: auto;
}

.table-container::-webkit-scrollbar {
  -ms-overflow-style: auto; /* IE and Edge */
  scrollbar-width: auto; /* Firefox */
  height: 8px; /* 滚动条高度 */
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道背景色 */
}

.table-container::-webkit-scrollbar-thumb {
  background: #888; /* 滚动条滑块背景色 */
  border-radius: 4px; /* 滑块圆角 */
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #555; /* 滑块悬停时的背景色 */
}

/* 表格 */
table {
  width: auto;
  border-collapse: collapse;
  margin-bottom: 10px;
  min-width: 100%;
}

th, td {
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
  padding: 10px;
  margin: 20px 0;
}

/* 友链 */
.friendLinks {
  width: 80%;
  margin: 0 auto;
}
</style>