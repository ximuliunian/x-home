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
                    <icon :icon="item.icon" height="30px" width="30px" />
                    <span style="margin-left: 5px">{{ item.name }}</span>
                </div>
            </container>
            <i v-for="i in 4" class="placeholder"></i>
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;

    .placeholder {
        width: 23%;
        min-width: 150px;
    }

    .social-link {
        width: 23%;
        cursor: pointer;
        border-radius: var(--radius-md);
        overflow: hidden;

        .link-card {
            display: flex;
            align-items: center;
            padding: 14px 16px;
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
    .social-link {
        width: 48% !important;
    }

    .welcome {
        font-size: 9vw;
        margin: 2vw 0;
    }
}

@media only screen and (max-width: 300px) {
    .social-link {
        width: 100% !important;
    }

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
