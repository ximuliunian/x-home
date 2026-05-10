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
import { RouterLink } from "vue-router";
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

function isShow(condition: string[]): boolean {
    for (const e of condition) {
        if (window.location.pathname === e) {
            return false;
        }
    }
    return true;
}
</script>

<style scoped>
.router {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px 0;
}

.routing {
    flex: 1;
    min-width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 15px 20px;
    color: white;
    font-weight: 600;
    font-size: 18px;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    background-size: 200%;
    background-position: 100%;
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.routing:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    animation: textFlashes 2s ease-in-out infinite;
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

@keyframes textFlashes {
    0% {
        background-position: 100%;
    }
    25% {
        background-position: 50%;
    }
    50% {
        background-position: 0;
    }
    75% {
        background-position: 50%;
    }
    100% {
        background-position: 100%;
    }
}
</style>
