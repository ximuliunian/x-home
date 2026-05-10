<template>
    <div class="timeline">
        <Router />
        <ul v-if="gossipContentList.length > 0" class="line">
            <li
                v-for="item in gossipContentList"
                class="card"
                v-show="item.info.host === locationHost || !onlyHost"
            >
                <div class="articleInfo">
                    <div class="author">
                        <img
                            :src="getUserAvatar(item.info.host)"
                            alt="avatar"
                        />
                        <span>{{ getUserName(item.info.host) }}</span>
                    </div>
                    <div class="time">{{ item.date }}</div>
                </div>
                <div class="content">
                    <ContentView :contents="item.content" />
                </div>
                <div class="content-bottom">
                    <icon
                        icon="icon-sys-pinbi"
                        width="25px"
                        height="25px"
                        class="icon"
                        title="不看该域主内容"
                        v-if="
                            item.info.host !== locationHost &&
                            isHostVisible(item.info.host)
                        "
                        @click="shieldUser(item.info.host)"
                    />
                    <icon
                        icon="icon-sys-gossip-info"
                        width="25px"
                        height="25px"
                        class="icon"
                        title="查看全部"
                        @click="
                            routerPush(
                                'gossipInfo',
                                buildQuery(item.info.host, item.info.id),
                            )
                        "
                    />
                </div>
            </li>
        </ul>
        <div v-else class="cover">
            <div>暂时什么都还没有哦</div>
        </div>
    </div>

    <Teleport to="body">
        <PastTop />
    </Teleport>
    <Teleport to="body">
        <Settings @onlyHost="(data) => (onlyHost = data.value)" />
    </Teleport>
</template>

<script setup lang="ts">
import Router from "@/components/Router.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import PastTop from "@/components/PastTop.vue";
import Icon from "@/components/Icon.vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import localStorage from "@/composition/localStorage";
import { getGossipCutByUrl } from "@/api/gossipAPI";
import Settings from "@/views/gossip/Settings.vue";
import type { GossipContent } from "@/api/gossipAPI";

interface GiscusConfig {
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
}

interface GossipUser {
    name: string;
    avatar: string;
    description: string;
    giscus?: GiscusConfig;
}

const gossipList = localStorage.getContent<string[]>(
    localStorage.menu.GOSSIP_CONTENT_LIST,
);

const gossipUserList =
    localStorage.getContent<Record<string, GossipUser>>(
        localStorage.menu.GOSSIP_USER_LIST,
    ) || {};

const gossipContentList = reactive<GossipContent[]>([]);
const router = useRouter();
const locationHost = ref<string>(
    typeof window !== "undefined" ? window.location.origin : "",
);
const onlyHost = ref<boolean>(false);
const shieldList = ref<Record<string, boolean>>({});

onMounted(() => {
    requestContentList();
});

function getUserAvatar(host: string): string {
    return gossipUserList[host]?.avatar || "/img/default-avatar.png";
}

function getUserName(host: string): string {
    return gossipUserList[host]?.name || host;
}

function isHostVisible(host: string): boolean {
    return shieldList.value[host] !== false;
}

function shieldUser(host: string): void {
    const shield =
        localStorage.getContent<string[]>(localStorage.menu.GOSSIP_SHIELD) ||
        [];
    if (shield.indexOf(host) === -1) {
        shield.push(host);
        localStorage.setContent(localStorage.menu.GOSSIP_SHIELD, shield);
    }
    shieldList.value[host] = false;

    const contentList =
        localStorage.getContent<string[]>(
            localStorage.menu.GOSSIP_CONTENT_LIST,
        ) || [];
    localStorage.setContent(
        localStorage.menu.GOSSIP_CONTENT_LIST,
        contentList.filter((item: string) => item.indexOf(host) === -1),
    );
}

async function requestContentList(): Promise<void> {
    if (!gossipList || gossipList.length === 0) return;

    const requests = gossipList.map(async (item: string) => {
        const itemT = item.split("-");
        const id = `${itemT[0]}-${itemT[1]}`;
        const host = itemT.slice(2).join("-");

        try {
            const resp = await getGossipCutByUrl(id, host);

            resp.info.host = host;
            shieldList.value[host] = true;
            return resp as GossipContent;
        } catch {
            return null;
        }
    });

    const results = await Promise.all(requests);
    gossipContentList.push(
        ...results.filter(
            (item: GossipContent | null): item is GossipContent =>
                item !== null,
        ),
    );
}

function routerPush(name: string, query: Record<string, string>): void {
    router.push({ name, query });
}

const buildQuery = (host: string, id: string): Record<string, string> => {
    const user = gossipUserList[host];
    if (!user) {
        return {
            id,
            url: host,
            name: host,
            avatar: "/img/default-avatar.png",
            description: "",
            giscus_repo: "",
            giscus_repoId: "",
            giscus_category: "",
            giscus_categoryId: "",
        };
    }
    return {
        id,
        url: host,
        name: user.name,
        avatar: user.avatar,
        description: user.description || "",
        giscus_repo: user.giscus?.repo || "",
        giscus_repoId: user.giscus?.repoId || "",
        giscus_category: user.giscus?.category || "",
        giscus_categoryId: user.giscus?.categoryId || "",
    };
};
</script>

<style scoped>
.content-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: 0 0 12px 12px;
    background-color: rgba(110, 110, 110, 0.3);
    padding: 8px 15px;

    .icon {
        cursor: pointer;
        margin: 0 5px;
        transition: all 0.3s ease;
        color: white;
    }

    .icon:hover {
        transform: scale(1.2);
        color: #a777e3;
    }
}

.cover {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    margin-top: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    div {
        font-size: 30px;
        font-weight: bolder;
        color: #2d3748;
        background-color: rgba(255, 255, 255, 0.7);
        padding: 20px 40px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
}

.content {
    width: 100%;
    background-color: rgba(22, 22, 22, 0.2);
    padding: 15px;
    border-radius: 0 12px 0 0;
    color: #fff;
    min-height: 100px;

    img {
        max-width: 80%;
        border-radius: 8px;
        margin: 10px 0;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }
}

.time {
    display: flex;
    align-items: center;
    padding: 8px 15px;
    border-radius: 0 12px 0 0;
    background-color: rgba(255, 255, 255, 0.5);
    color: #2d3748;
    font-size: 14px;
    font-weight: 500;
}

.author {
    display: flex;
    align-items: center;
    max-width: 50%;
    padding: 8px 15px;
    border-radius: 12px 0 0 0;
    border-right: 2px dashed rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.5);
    color: #2d3748;

    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
        border: 2px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
    }
}

.articleInfo {
    display: flex;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px 12px 0 0;
    overflow: hidden;
}

.line {
    border-left: 5px solid rgba(255, 255, 255, 0.8);
    padding-left: 20px;
    margin-left: 10px;
}

.card {
    margin: 20px 0;
    list-style: none;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.timeline {
    margin: 0 auto;
    width: 80%;
    min-width: 300px;
    padding: 20px 5px;
}

@media (max-width: 768px) {
    .timeline {
        width: 95%;
    }

    .articleInfo {
        flex-direction: column;
    }

    .author {
        max-width: 100%;
        border-right: none;
        border-bottom: 2px dashed rgba(0, 0, 0, 0.2);
    }

    .time {
        border-radius: 0;
    }
}
</style>
