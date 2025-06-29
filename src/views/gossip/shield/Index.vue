<template>
    <div class="user-list-container">
        <div class="header">
            <h1>屏蔽列表管理</h1>
            <p>您可以在此管理已屏蔽的用户</p>
        </div>

        <div v-for="(user, index) in userList" :key="index" class="user-item" v-if="userList.length > 0">
            <div class="avatar-container">
                <img :src="user.avatar" alt="用户头像" class="avatar">
            </div>

            <div class="user-info">
                <div class="username">{{ user.nickname }}</div>
                <div class="bio">{{ user.bio }}</div>
            </div>

            <button class="remove-btn" @click="handleRemove(user.id)">
                <Icon icon="icon-sys-shanchu" width="18px" height="18px" />
                移除
            </button>
        </div>
        <div v-else class="cover">
            <div>您的屏蔽列表为空</div>
        </div>
    </div>
    <PastTop />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import localStorage from "@/composition/localStorage.js";
import PastTop from "@/components/PastTop.vue";
import Icon from "@/components/Icon.vue";

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
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
        font-size: 28px;
        color: #2d3748;
        margin-bottom: 10px;
    }

    p {
        color: #4a5568;
        font-size: 16px;
    }
}

.cover {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    margin: 20px 0;
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    div {
        font-size: 24px;
        font-weight: 600;
        color: #4a5568;
        background: rgba(255, 255, 255, 0.8);
        padding: 20px 40px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
}

.user-item {
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 15px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.user-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.avatar-container {
    margin-right: 20px;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.user-item:hover .avatar {
    transform: scale(1.05);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

.user-info {
    flex: 1;
}

.username {
    font-weight: 700;
    font-size: 18px;
    color: #2d3748;
    margin-bottom: 5px;
}

.bio {
    font-size: 14px;
    color: #4a5568;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.remove-btn {
    display: flex;
    align-items: center;
    padding: 10px 18px;
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.remove-btn:hover {
    background: linear-gradient(135deg, #ff5252, #ff7b7b);
    transform: translateY(-2px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
    .user-item {
        flex-direction: column;
        text-align: center;
        padding: 25px;
    }

    .avatar-container {
        margin-right: 0;
        margin-bottom: 15px;
    }

    .user-info {
        margin-bottom: 15px;
    }

    .remove-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>