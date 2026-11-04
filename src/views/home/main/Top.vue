<template>
    <div class="top">
        <div v-if="config.enable.home.welcome" class="welcome">
            Hello, I' m <span>{{ config.name }}</span>
        </div>

        <div v-if="config.enable.home.social" class="social-links">
            <container
                v-for="(item, key) in config.social"
                :key="key"
                class="social-link"
                close-title
                close-width
                @click="commonlyFunctions.openLink(item.url, true)"
            >
                <div class="link-card">
                    <icon :icon="item.icon" height="26px" width="26px" />
                    <span>{{ item.name }}</span>
                </div>
            </container>
        </div>

        <div
            v-if="config.enable.home.githubContribution"
            class="github-contribution"
        >
            <img
                alt="github contribution"
                src="/img/github-contribution.svg"
                width="100%"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";
import commonlyFunctions from "@/composition/commonlyFunctions";
import config from "virtual:yaml-config";
</script>

<style scoped>
.social-links {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-top: 28px;

    .social-link {
        cursor: pointer;
        border-radius: var(--radius-md);
        overflow: hidden;
        margin-bottom: 0;

        .link-card {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 16px 20px;
            background: var(--card-bg);
            transition:
                background 0.3s ease,
                box-shadow 0.3s ease;
        }
    }

    .social-link:hover .link-card {
        background: var(--card-bg-strong);
    }
}

.welcome {
    font-weight: 800;
    font-size: 55px;
    letter-spacing: -0.5px;
    margin: 12px 0 28px;
    line-height: 1.2;
    color: #fff;
    text-shadow:
        0 2px 12px rgba(15, 23, 42, 0.5),
        0 1px 3px rgba(15, 23, 42, 0.35);

    span {
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200%;
        background-position: 0;
        animation: backgroundSizeAnimation 10s ease-in-out infinite;
        background-image: linear-gradient(
            120deg,
            #9db8ff,
            #c9a6ff 30%,
            #8fe6fb 60%
        );
        filter: drop-shadow(0 2px 10px rgba(124, 156, 255, 0.4));
    }
}

.top {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
}

.github-contribution {
    margin-top: 28px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    transition: all 0.3s ease;
    border: var(--border-soft);
    background-color: rgba(255, 255, 255, 0.35);
}

.github-contribution:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lift);
}

@media only screen and (max-width: 800px) {
    .social-links {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .welcome {
        font-size: 9vw;
        margin: 2vw 0;
    }
}

@media only screen and (max-width: 300px) {
    .welcome {
        font-size: 15vw;
        margin: 2vw 0;
    }
}

@keyframes backgroundSizeAnimation {
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
