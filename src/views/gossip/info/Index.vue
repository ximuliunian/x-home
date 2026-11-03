<template>
    <div class="gossipInfo">
        <div class="header">
            <div class="header-left">
                <img :src="config.avatar" alt="用户头像" width="50px" height="50px" />
                <span
                    >{{ config.name }}&emsp;&bullet;&emsp;{{
                        config.description
                    }}</span
                >
            </div>
        </div>

        <div class="content" v-if="gossipContentFlag">
            <p>内容正在努力加载中......</p>
        </div>
        <div class="content" v-else>
            <ContentView :contents="gossipContent.content" />
            <p style="text-align: right">—— {{ gossipContent.date }}</p>
        </div>

        <div class="comment">
            <Comment
                :term="gossipId"
                :repo="config.giscus.repo"
                :repoId="config.giscus.repoId"
                :category="config.giscus.category"
                :categoryId="config.giscus.categoryId"
                :mapping="CommentEnum.MappingEnum.SPECIFIC"
            />
        </div>
    </div>

    <Teleport to="body">
        <PastTop />
    </Teleport>
</template>

<script setup lang="ts">
import ContentView from "@/components/contentView/ContentView.vue";
import Comment from "@/components/comment.vue";
import CommentEnum from "@/enums/commentEnum";
import PastTop from "@/components/PastTop.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getGossip } from "@/api/gossipAPI";
import config from "virtual:yaml-config";

interface GossipContent {
    date: string;
    content: string[];
    info: {
        id: string;
    };
}

const gossipContent = reactive<Partial<GossipContent>>({});
const gossipContentFlag = ref<boolean>(true);
const gossipId = ref<string>("");
const router = useRouter();

onMounted(async () => {
    gossipId.value = (router.currentRoute.value.query.id as string) || "";
    if (!gossipId.value) {
        gossipContentFlag.value = false;
        return;
    }

    try {
        const resp = await getGossip(gossipId.value);
        gossipContent.content = resp.content;
        gossipContent.date = resp.date;
    } catch {
        // 内容请求失败时展示占位内容
    } finally {
        gossipContentFlag.value = false;
    }
});
</script>

<style scoped>
.comment {
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

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
}

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
