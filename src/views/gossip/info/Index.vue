<template>
  <div class="gossipInfo">
    <PastTop/>
    <div class="header">
      <div class="header-left">
        <img :src="queryData.user.avatar" alt="用户头像" width="50px" height="50px"/>
        <span>{{ queryData.user.name }}&emsp13;&bullet;&emsp13;{{ queryData.user.description }}</span>
      </div>

      <button class="header-right" @click="commonlyFunctions.openLink(queryData.url, true)">
        前往主页
        <Icon icon="icon-sys-qianwang" width="25px" height="25px" style="margin-left: 5px"/>
      </button>
    </div>

    <div class="content" v-if="gossipContentFlag">
      <p>内容正在努力加载中......</p>
    </div>
    <div class="content" v-else>
      <ContentView :contents="gossipContent.content"/>
      <p style="text-align: right">—— {{ gossipContent.date }}</p>
    </div>

    <div class="comment">
      <Comment
          :term="queryData.id"
          :repo="queryData.giscus.repo"
          :repoId="queryData.giscus.repoId"
          :category="queryData.giscus.category"
          :categoryId="queryData.giscus.categoryId"
          :mapping="CommentEnum.MappingEnum.SPECIFIC"/>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import Comment from "@/components/comment.vue";
import CommentEnum from "@/enums/commentEnum.js";
import PastTop from "@/components/PastTop.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import commonlyFunctions from "@/composition/commonlyFunctions.js";
import { getGossip, getGossipByUrl } from "@/api/gossipAPI.js";

// 地址栏传参
let queryData = reactive({
  id: null,
  url: null,
  user: {
    name: null,
    avatar: null,
    description: null
  },
  giscus: {
    repo: null,
    repoId: null,
    category: null,
    categoryId: null
  }
})

// 内容
let gossipContent = reactive({})
let gossipContentFlag = ref(true)

// 路由
const router = useRouter()

onMounted(() => {
  // 获取路由参数
  initQueryData()
  // 获取文本内容
  getGossipContent()
})

// 获取文本内容
const getGossipContent = () => {
  if (location.host === new URL(queryData.url).host) {
    getGossip(queryData.id).then(resp => {
      gossipContent = resp
      if (resp.info.id == null || resp.info.id === '' || resp.info.id === undefined) return
      gossipContentFlag.value = false
    })
  } else {
    getGossipByUrl(queryData.id, queryData.url).then(resp => {
      gossipContent = resp
      if (resp.info.id == null || resp.info.id === '' || resp.info.id === undefined) return
      gossipContentFlag.value = false
    })
  }
}


// 路由参数初始化
const initQueryData = () => {
  const query = router.currentRoute.value.query;
  // 地址栏传参
  queryData.id = query.id;
  queryData.url = query.url;
  queryData.user.name = query.name;
  queryData.user.avatar = query.avatar;
  queryData.user.description = query.description;
  queryData.giscus.repo = query.giscus_repo;
  queryData.giscus.repoId = query.giscus_repoId;
  queryData.giscus.category = query.giscus_category;
  queryData.giscus.categoryId = query.giscus_categoryId;
}
</script>

<style scoped>
/* 评论 */
.comment {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* 内容 */
.content {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 12px;
  min-height: 200px;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.content:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  .header-left {
    display: flex;
    align-items: center;
    border-radius: 50px;

    img {
      border-radius: 50%;
      margin-right: 15px;
      width: 50px;
      height: 50px;
      object-fit: cover;
      border: 2px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    }
    
    span {
      font-weight: 500;
      color: #4a5568;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 25px;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    color: white;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
      background: linear-gradient(135deg, #5d7dfa, #9a6ad9);
    }
  }
}

/* 容器 */
.gossipInfo {
  margin: 0 auto;
  width: 80%;
  min-width: 300px;
  padding: 5px;
}

@media (max-width: 768px) {
  .gossipInfo {
    width: 95%;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    
    .header-left {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>