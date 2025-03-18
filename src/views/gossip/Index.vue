<template>
  <div class="timeline">
    <Router/>
    <ul v-if="gossipContentList.length > 0" class="line">
      <li v-for="item in gossipContentList" class="card" v-show="item.info.host === host || !onlyHost">
        <div class="articleInfo">
          <div class="author">
            <img :src="gossipUserList[item.info.host].avatar" alt="假装有一张图片">
            <span>{{ gossipUserList[item.info.host].name }}</span>
          </div>
          <div class="time">{{ item.date }}</div>
        </div>
        <div class="content">
          <ContentView :contents="item.content"/>
        </div>
        <div class="content-bottom">
          <icon
              icon="icon-sys-pinbi"
              width="25px" height="25px"
              class="icon" title="不看该域主内容"
              v-if="item.info.host !== host && shieldList[item.info.host]"
              @click="shieldUser(item.info.host)"/>
          <icon
              icon="icon-sys-pinglun"
              width="25px" height="25px"
              class="icon" title="查看全部"
              @click="routerPush('gossipInfo',buildQuery(item.info.host, item.info.id))"/>
        </div>
      </li>
    </ul>
    <div v-else class="cover">
      <div>暂时什么都还没有哦</div>
    </div>

    <PastTop/>
    <Settings @onlyHost="(data)=> onlyHost = data.value"/>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import PastTop from "@/components/PastTop.vue";
import Icon from "@/components/Icon.vue";
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import localStorage from "@/composition/localStorage.js";
import {getGossipCutByUrl} from "@/api/gossipAPI.js";
import Settings from "@/views/gossip/Settings.vue";

// 本地列表信息
const gossipList = localStorage.getContent(localStorage.menu.GOSSIP_CONTENT_LIST);

// 本地用户信息
const gossipUserList = localStorage.getContent(localStorage.menu.GOSSIP_USER_LIST);

// 列表内容
const gossipContentList = reactive([]);

// 路由
const router = useRouter();

// 域名
const host = ref(location.host);

// 只看域主
const onlyHost = ref(false);

// 屏蔽列表
const shieldList = ref({});

// 生命周期
onMounted(() => {
  // 请求内容列表
  requestContentList()
})

// 屏蔽域主
function shieldUser(host) {
  // 获取屏蔽列表
  const shield = localStorage.getContent(localStorage.menu.GOSSIP_SHIELD) || [];
  if (shield.indexOf(host) === -1) {
    // 如果不在屏蔽列表中则添加
    shield.push(host);
    localStorage.setContent(localStorage.menu.GOSSIP_SHIELD, shield);
    shieldList.value[host] = false;
  }

  // 删除内容列表中所有有该域主的数据
  const contentList = localStorage.getContent(localStorage.menu.GOSSIP_CONTENT_LIST)
  localStorage.setContent(localStorage.menu.GOSSIP_CONTENT_LIST, contentList.filter(item => item.indexOf(host) === -1))
}

// 请求内容列表
function requestContentList() {
  if (!gossipList) return
  gossipList.forEach(item => {
    const itemT = item.split("-")
    // ID
    const id = `${itemT[0]}-${itemT[1]}`;
    // 主机
    const host = () => {
      let T = itemT[2];
      for (let i = 3; i < itemT.length; i++) {
        T += `-${itemT[i]}`
      }
      return T
    }
    // 请求内容
    getGossipCutByUrl(id, host()).then(resp => {
      if (typeof resp !== 'object') return
      resp.info.host = host();
      shieldList.value[host()] = true;
      gossipContentList.push(resp)
    })
  })
}

// 路由跳转
function routerPush(name, query) {
  router.push({name: name, query: {...query}});
}

// 构建传递数据
const buildQuery = (host, id) => {
  const user = gossipUserList[host];
  return {
    id: id,
    url: host,
    name: user.name,
    avatar: user.avatar,
    description: user.description,
    giscus_repo: user.giscus.repo,
    giscus_repoId: user.giscus.repoId,
    giscus_category: user.giscus.category,
    giscus_categoryId: user.giscus.categoryId
  }
}
</script>

<style scoped>
/* 内容底部 */
.content-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 0 0 10px 10px;
  background-color: rgba(110, 110, 110, 0.5);

  .icon {
    cursor: pointer;
    margin: 5px;
  }
}

/* 覆盖 */
.cover {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  div {
    font-size: 30px;
    font-weight: bolder;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    background-color: rgba(110, 110, 110, 0.3);
    padding: 10px;
    border-radius: 10px;
  }
}

/* 内容 */
.content {
  width: 100%;
  background-color: rgb(22 22 22 / 30%);;
  padding: 5px;
  border-radius: 0 10px 0 0;
  color: #fff;

  img {
    width: 80%;
  }
}

/* 时间 */
.time {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 0 10px 0 0;
  background-color: rgba(255, 255, 255, 0.36);
}

/* 作者 */
.author {
  display: flex;
  align-items: center;
  max-width: 50%;
  padding: 5px;
  border-radius: 10px 0 0 0;
  border-right: 2px dashed rgba(0, 0, 0, 0.31);
  background-color: rgba(255, 255, 255, 0.36);

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  span {
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* 文章信息 */
.articleInfo {
  display: flex;
}

/* 时间线 */
.line {
  border-left: 5px solid rgba(0, 0, 0, 0.31);
}

/* 卡片 */
.card {
  margin: 10px;
  list-style: none;
}

/* 卡片左侧小圆点 */
.card::before {
  content: '';
  display: block;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: white;
  position: relative;
  left: -19px;
  top: 35px;
}

/* 时间轴 */
.timeline {
  margin: 0 auto;
  width: 80%;
  min-width: 300px;
  padding: 5px;
}
</style>