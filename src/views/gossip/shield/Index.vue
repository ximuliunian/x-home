<template>
  <div class="user-list-container">
    <div v-for="(user, index) in userList" :key="index" class="user-item" v-if="userList.length > 0">
      <!-- 左侧头像 -->
      <div class="avatar-container">
        <img :src="user.avatar" alt="用户头像" class="avatar">
      </div>

      <div class="user-info">
        <div class="username">{{ user.nickname }}</div>
        <div class="bio">{{ user.bio }}</div>
      </div>

      <button class="remove-btn" @click="handleRemove(user.id)">移除</button>
    </div>
    <div v-else class="cover">
      <div>什么都还没有哦~</div>
    </div>
    <PastTop/>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import localStorage from "@/composition/localStorage.js";
import PastTop from "@/components/PastTop.vue";

// 模拟用户数据
const userList = ref([])

onMounted(() => {
  getUsers()
})

// 获取用户方法
const getUsers = () => {
  const users = localStorage.getContent(localStorage.menu.GOSSIP_USER_LIST)
  localStorage.getContent(localStorage.menu.GOSSIP_SHIELD)?.forEach(user => {
    userList.value.push({
      id: user,
      avatar: users[user].avatar,
      nickname: users[user].name,
      bio: users[user].description
    })
  })
}

// 移除用户方法
const handleRemove = (userId) => {
  userList.value = userList.value.filter(user => user.id !== userId)
  localStorage.setContent(localStorage.menu.GOSSIP_SHIELD, userList.value.map(user => user.id))
}
</script>

<style scoped>
.user-list-container {
  max-width: 800px;
  min-width: 300px;
  margin: 20px auto;
  padding: 0 20px;
}

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

.user-item {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.user-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar-container {
  margin-right: 16px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.username {
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.bio {
  font-size: 0.9em;
  color: #606266;
}

.remove-btn {
  padding: 8px 16px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #e64545;
}
</style>