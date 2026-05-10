<template>
    <Section icon="icon-sys-nav" title="站内导航">
        <div class="sites">
            <Container
                v-for="(item, key) in config.siteNavs"
                :key="key"
                class="site"
                close-title
                close-width
                @click="commonlyFunctions.openLink(item.url, true)"
            >
                <div style="display: flex; align-items: center">
                    <Icon :icon="item.icon" height="30px" width="30px" />
                    <span style="margin-left: 10px">{{ item.name }}</span>
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
.sites {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.site {
    width: 24%;
    transition: width 0.3s;
    margin-bottom: 10px;
    font-weight: bold;
    color: #2a2727;
    cursor: pointer;
    transition: all 0.3s ease;
}

.site:hover {
    transform: translateY(-5px);
}

.placeholder {
    width: 24%;
}

@media only screen and (max-width: 800px) {
    .site {
        width: 49%;
        transition: width 0.3s;
    }

    .placeholder {
        width: 49%;
    }
}

@media only screen and (max-width: 300px) {
    .site {
        width: 100%;
        transition: width 0.3s;
    }
}
</style>
