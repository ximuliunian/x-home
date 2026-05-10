<template>
    <container height="auto" title="一言" width="100%">
        <div class="hitokoto">
            <p class="content">{{ hitokotoContent }}</p>
            <br />
            <p class="from">{{ hitokotoFrom }}</p>
        </div>
    </container>
</template>

<script setup lang="ts">
import Container from "@/components/Container.vue";
import { onMounted, ref } from "vue";
import localStorage from "@/composition/localStorage";

interface HitokotoData {
    hitokoto: string;
    from: string;
    from_who?: string;
}

const hitokotoContent = ref("");
const hitokotoFrom = ref("");

onMounted(() => {
    const hitokoto = localStorage.getContent(localStorage.menu.HITOKOTO);
    if (hitokoto) {
        run(hitokoto as HitokotoData);
    } else {
        getHitokoto(true);
    }
    getHitokoto(false);
});

function run(hitokoto: HitokotoData): void {
    typewriter(hitokoto.hitokoto);
    const regex = /^《.*》$/;
    const from = regex.test(hitokoto.from)
        ? hitokoto.from
        : `《${hitokoto.from}》`;
    const who = hitokoto.from_who ? hitokoto.from_who : "";
    hitokotoFrom.value = `${from} ${who}`;
}

function getHitokoto(isRunDirectly: boolean): void {
    fetch("https://v1.hitokoto.cn")
        .then((response) => response.json())
        .then((data) => {
            if (isRunDirectly) {
                run(data as HitokotoData);
            }
            localStorage.setContent(localStorage.menu.HITOKOTO, data);
        });
}

function typewriter(str: string): void {
    let j = 0;
    const arr = str.split("");
    const timer = setInterval(() => {
        if (j < arr.length) {
            hitokotoContent.value += arr[j++];
        } else {
            clearInterval(timer);
        }
    }, 200);
}
</script>

<style scoped>
.content {
    padding-top: 10px;
    font-size: 16px;
    line-height: 1.6;
    color: #4a5568;
    min-height: 80px;
    transition: all 0.3s ease;
}

.from {
    font-size: 14px;
    text-align: right;
    color: #718096;
    font-style: italic;
    transition: all 0.3s ease;
}

.container:hover .content {
    color: #2d3748;
}

.container:hover .from {
    color: #4a5568;
}

.content::after {
    content: "|";
    animation: blink 1s infinite;
}

@keyframes blink {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
