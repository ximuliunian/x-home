<template>
    <div class="gossipInfo">
        <div class="header">
            <div class="header-left">
                <img
                    :src="queryData.user.avatar"
                    alt="用户头像"
                    width="50px"
                    height="50px"
                />
                <span
                    >{{ queryData.user.name }}&emsp;&bullet;&emsp;{{
                        queryData.user.description
                    }}</span
                >
            </div>

            <button
                class="header-right"
                @click="commonlyFunctions.openLink(queryData.url, true)"
            >
                前往主页
                <Icon
                    icon="icon-sys-qianwang"
                    width="25px"
                    height="25px"
                    style="margin-left: 5px"
                />
            </button>
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
                :term="queryData.id"
                :repo="queryData.giscus.repo as `${string}/${string}` | undefined" 
                :repoId="queryData.giscus.repoId"
                :category="queryData.giscus.category"
                :categoryId="queryData.giscus.categoryId"
                :mapping="CommentEnum.MappingEnum.SPECIFIC"
            />
        </div>
    </div>

    <Teleport to="body">
        <PastTop />
    </Teleport>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import Comment from "@/components/comment.vue";
import CommentEnum from "@/enums/commentEnum";
import PastTop from "@/components/PastTop.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import commonlyFunctions from "@/composition/commonlyFunctions";
import { getGossip, getGossipByUrl } from "@/api/gossipAPI";

interface QueryData {
    id: string | undefined;
    url: string | undefined;
    user: {
        name: string | undefined;
        avatar: string | undefined;
        description: string | undefined;
    };
    giscus: {
        repo: string | undefined;
        repoId: string | undefined;
        category: string | undefined;
        categoryId: string | undefined;
    };
}

interface GossipContent {
    date: string;
    content: string[];
    info: {
        id: string;
    };
}

const queryData = reactive<QueryData>({
    id: undefined,
    url: undefined,
    user: {
        name: undefined,
        avatar: undefined,
        description: undefined,
    },
    giscus: {
        repo: undefined,
        repoId: undefined,
        category: undefined,
        categoryId: undefined,
    },
});

const gossipContent = reactive<Partial<GossipContent>>({});
const gossipContentFlag = ref<boolean>(true);
const router = useRouter();

onMounted(() => {
    initQueryData();
    getGossipContent();
});

const getGossipContent = async (): Promise<void> => {
    const id = queryData.id;
    const url = queryData.url;
    if (!id || !url) return;

    const host = new URL(url).host;

    if (location.host === host) {
        const resp = await getGossip(id);
        gossipContent.content = resp.content;
        gossipContent.date = resp.date;
        if (resp.info.id) {
            gossipContentFlag.value = false;
        }
    } else {
        const resp = await getGossipByUrl(id, url);
        gossipContent.content = resp.content;
        gossipContent.date = resp.date;
        if (resp.info.id) {
            gossipContentFlag.value = false;
        }
    }
};

const initQueryData = (): void => {
    const query = router.currentRoute.value.query;
    queryData.id = query.id as string;
    queryData.url = query.url as string;
    queryData.user.name = query.name as string;
    queryData.user.avatar = query.avatar as string;
    queryData.user.description = query.description as string;
    queryData.giscus.repo = query.giscus_repo as string;
    queryData.giscus.repoId = query.giscus_repoId as string;
    queryData.giscus.category = query.giscus_category as string;
    queryData.giscus.categoryId = query.giscus_categoryId as string;
};
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
