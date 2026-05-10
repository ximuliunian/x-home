<template>
    <Section icon="icon-sys-skills" title="技术栈">
        <img
            :src="srcLike"
            alt="技术栈"
            style="max-width: 100%; border-radius: 12px"
        />
    </Section>
</template>

<script setup lang="ts">
import Section from "@/components/Section.vue";
import { computed, onMounted, ref } from "vue";
import config from "virtual:yaml-config";

const url = "https://skillicons.dev/icons";
const perline = ref<number>(17);

const srcLike = computed(() => {
    return `${url}?i=${config.skills.list.join(",")}&theme=${config.skills.theme}&perline=${perline.value}`;
});

onMounted(() => {
    window.addEventListener("resize", () => {
        const width = window.innerWidth;
        let newPerline: number;

        if (width < 500) {
            newPerline = 10;
        } else if (width < 800) {
            newPerline = 14;
        } else {
            newPerline = 17;
        }

        if (newPerline !== perline.value) {
            perline.value = newPerline;
        }
    });
});
</script>

<style scoped>
img {
    border-radius: 12px;
}
</style>
