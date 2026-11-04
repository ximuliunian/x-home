<template>
    <div class="router">
        <RouterLink v-if="isShow(['/'])" to="/" class="routing">
            <Icon :height="icon.height" :icon="icon.home" :width="icon.width" />
            主页
        </RouterLink>
        <RouterLink
            v-if="config.enable.router.comments && isShow(['/comments'])"
            to="/comments"
            class="routing"
        >
            <Icon
                :height="icon.height"
                :icon="icon.comment"
                :width="icon.width"
            />
            留言板
        </RouterLink>
        <RouterLink
            v-if="config.enable.router.gossip && isShow(['/gossip'])"
            to="/gossip"
            class="routing"
        >
            <Icon
                :height="icon.height"
                :icon="icon.gossip"
                :width="icon.width"
            />
            闲言碎语
        </RouterLink>
        <RouterLink
            v-if="config.enable.router.friendLinks && isShow(['/friendLinks'])"
            to="/friendLinks"
            class="routing"
        >
            <Icon
                :height="icon.height"
                :icon="icon.friendLinks"
                :width="icon.width"
            />
            友链
        </RouterLink>
        <i class="placeholder"></i>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import Icon from "@/components/Icon.vue";
import config from "virtual:yaml-config";

interface IconConfig {
    home: string;
    comment: string;
    gossip: string;
    friendLinks: string;
    width: string;
    height: string;
}

const icon: IconConfig = {
    home: "icon-sys-home",
    comment: "icon-sys-comment",
    gossip: "icon-sys-gossip",
    friendLinks: "icon-sys-friendLinks",
    width: "25px",
    height: "25px",
};

const route = useRoute();

function isShow(condition: string[]): boolean {
    return !condition.includes(route.path);
}
</script>

<style scoped>
.router {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
    margin: 20px 0 24px;
}

.routing {
    flex: 1;
    min-width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    text-decoration: none;
    padding: 15px 20px;
    color: white;
    font-weight: 600;
    font-size: 17px;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    background-size: 160%;
    background-position: 100%;
    border-radius: var(--radius-md);
    transition: all 0.35s ease;
    box-shadow: 0 6px 16px rgba(110, 142, 251, 0.25);
}

.routing:hover {
    transform: translateY(-3px);
    background-position: 0;
    box-shadow: 0 10px 24px rgba(110, 142, 251, 0.35);
}

.placeholder {
    display: none;
}

@media only screen and (max-width: 800px) {
    .routing {
        min-width: 45%;
        transition: all 0.3s;
    }

    .placeholder {
        display: none;
    }
}

@media only screen and (max-width: 500px) {
    .routing {
        min-width: 100%;
    }
}
</style>
