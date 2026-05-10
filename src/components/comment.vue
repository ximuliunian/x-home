<template>
    <Giscus
        id="comments"
        :repo="repo || (config.giscus.repo as `${string}/${string}`)"
        :repoId="repoId || config.giscus.repoId"
        :category="category || config.giscus.category"
        :categoryId="categoryId || config.giscus.categoryId"
        :mapping="mapping"
        :term="term"
        inputPosition="top"
        :theme="config.giscus.theme || 'light'"
        lang="zh-CN"
        crossorigin="anonymous"
        loading="lazy"
        emit-metadata="0"
        reactions-enabled="1"
        async
    />
</template>

<script setup lang="ts">
import Giscus from "@giscus/vue";
import type { Mapping } from "@giscus/vue";
import config from "virtual:yaml-config";

interface Props {
    mapping?: Mapping;
    repo?: `${string}/${string}`;
    repoId?: string;
    category?: string;
    categoryId?: string;
    term?: string;
}

withDefaults(defineProps<Props>(), {
    mapping: "pathname",
});
</script>

<style scoped>
#comments {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

#comments:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>
