<template>
    <Section icon="icon-sys-project" title="项目">
        <div class="projects">
            <Container
                v-for="(item, key) in config.projects"
                :key="key"
                class="project"
                close-title
                close-width
                @click="commonlyFunctions.openLink(item.url, true)"
            >
                <div class="title">
                    <Icon :icon="item.icon" height="30px" width="30px" />
                    <span style="margin-left: 5px">{{ item.name }}</span>
                </div>
                <div :title="item.description" class="description">
                    {{ item.description }}
                </div>
            </Container>
            <i v-for="i in 3" class="placeholder"></i>
        </div>
    </Section>
</template>

<script setup lang="ts">
import Section from "@/components/Section.vue";
import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";
import commonlyFunctions from "@/composition/commonlyFunctions";
import config from "virtual:yaml-config";
</script>

<style scoped>
.projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 15px;
}

.project {
    width: 23%;
    transition: all 0.3s ease;
    margin-bottom: 0;
    font-weight: 500;
    color: #2d3748;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
}

.project:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.9);
}

.title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    color: #2d3748;
}

.description {
    margin-top: 15px;
    font-size: 14px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    color: #4a5568;
    line-height: 1.5;
}

.placeholder {
    width: 23%;
}

@media only screen and (max-width: 910px) {
    .project {
        min-width: 45%;
        transition: all 0.3s;
    }

    .placeholder {
        min-width: 45%;
    }
}

@media only screen and (max-width: 500px) {
    .project {
        min-width: 100%;
    }
}
</style>
