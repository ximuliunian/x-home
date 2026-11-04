<template>
    <div class="friendLinks">
        <div class="description" v-if="config.enable.friendLinks.description">
            <h1 style="border-bottom: 3px dashed #ccc; padding-bottom: 10px">
                <Icon icon="icon-sys-ya" height="38px" width="38px" />
                友人帐
            </h1>
            <div class="description-content">
                <ContentView
                    :contents="friendLinks.description"
                    img-height="200px"
                    img-inline-block
                />
            </div>
        </div>

        <Router />

        <Section
            :title="item.sort"
            :icon="item.icon"
            v-for="(item, key) in list"
            :key="key"
        >
            <div class="links-container">
                <div
                    class="links"
                    :style="{ backgroundColor: item.bgColor }"
                    v-for="(link, index) in item.list"
                    :key="index"
                    @click="commonlyFunctions.openLink(link.url, true)"
                >
                    <img :src="link.avatar" alt="假装有一张图片" />
                    <div class="info">
                        <span>{{ link.name }}</span>
                        <span>{{ link.desc }}</span>
                    </div>
                </div>
                <i v-for="i in 2" class="placeholder"></i>
            </div>
        </Section>

        <div class="description">
            <h1 style="border-bottom: 3px dashed #ccc; padding-bottom: 10px">
                <Icon icon="icon-sys-info" height="38px" width="38px" />
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
                            <td>{{ friendLinks.scheme.name }}</td>
                        </tr>
                        <tr>
                            <td>简介</td>
                            <td>是</td>
                            <td>{{ friendLinks.scheme.desc }}</td>
                        </tr>
                        <tr>
                            <td>链接</td>
                            <td>是</td>
                            <td>{{ friendLinks.scheme.url }}</td>
                        </tr>
                        <tr>
                            <td>头像</td>
                            <td>是</td>
                            <td>{{ friendLinks.scheme.avatar }}</td>
                        </tr>
                        <tr>
                            <td>背景颜色</td>
                            <td>否</td>
                            <td>{{ friendLinks.scheme.bgColor }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <h1 style="border-bottom: 3px dashed #ccc; padding-bottom: 10px">
                <Icon icon="icon-sys-yaoqiu" height="38px" width="38px" />
                申请要求
            </h1>
            <div class="description-content">
                <ContentView
                    :contents="friendLinks.require"
                    img-height="200px"
                    img-inline-block
                />
            </div>
        </div>

        <div class="description">
            <Comment mapping="specific" term="/friendLinks" />
        </div>
    </div>

    <Teleport to="body">
        <PastTop />
    </Teleport>
</template>

<script setup lang="ts">
import Router from "@/components/Router.vue";
import Icon from "@/components/Icon.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import { onMounted, reactive, ref } from "vue";
import Section from "@/components/Section.vue";
import PastTop from "@/components/PastTop.vue";
import commonlyFunctions from "@/composition/commonlyFunctions";
import { getSorted, type LinkItem } from "@/api/friendLinkAPI";
import Comment from "@/components/comment.vue";
import { getFriendLink } from "@/api/rootAPI";
import config from "virtual:yaml-config";

interface LinkGroup {
    sort: string;
    icon: string;
    list: LinkItem[];
    bgColor?: string;
}

const friendLinks = config._friendLinks;
const list = reactive<LinkGroup[]>([]);
const links = ref<Record<string, LinkGroup>>({});

onMounted(() => {
    links.value.notSorted = { sort: "小伙伴们", icon: "icon-sys-ya", list: [] };
    friendLinks.links?.forEach((link: { sort: string; icon: string }) => {
        links.value[link.sort] = { ...link, list: [] };
    });

    getFriendLink().then((respFriendLink: string[]) => {
        for (const e of respFriendLink) {
            getSorted(e).then((resp: LinkItem[]) => {
                const sort = e.split(".")[0].split("-")[0];
                addList(
                    sort,
                    resp,
                    list.some((fl) => fl.sort == sort),
                );
            });
        }
    });
});

function addList(sort: string, array: LinkItem[], isCreate: boolean): void {
    if (isCreate) {
        for (const listKey in list) {
            if (list[listKey].sort == sort) {
                list[listKey].list.push(...array);
            }
        }
    } else {
        const e = links.value[sort];
        e.list.push(...array);
        list.push(e);
    }
}
</script>

<style scoped>
.info {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    span:first-child {
        font-weight: bold;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span:last-child {
        margin-top: 5px;
        font-size: 14px;
        color: #4a5568;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

.placeholder {
    width: 33%;
}

.links {
    width: 32%;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.links:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.links img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.links-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
}

.table-container {
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.table-container::-webkit-scrollbar {
    -ms-overflow-style: auto;
    scrollbar-width: auto;
    height: 8px;
}

.table-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
    background: #555;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    min-width: 100%;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    overflow: hidden;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
    user-select: text;
}

th {
    background-color: rgba(110, 142, 251, 0.2);
    font-weight: 600;
}

tr:nth-child(even) {
    background-color: rgba(247, 250, 252, 0.5);
}

tr:hover {
    background-color: rgba(226, 232, 240, 0.3);
}

.description-content {
    margin-top: 15px;
    font-size: 16px;
    line-height: 1.6;
    color: #4a5568;
}

.description {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    padding: 20px;
    margin: 25px 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.description:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.friendLinks {
    width: 80%;
    margin: 0 auto;
}

@media only screen and (max-width: 800px) {
    .links {
        width: 48%;
    }

    .placeholder {
        width: 48%;
    }

    .friendLinks {
        width: 95%;
    }
}

@media only screen and (max-width: 500px) {
    .links {
        width: 100%;
    }
}
</style>
