<template>
    <Section icon="icon-sys-nav" title="站内导航">
        <div class="sites">
            <Container v-for="(item, key) in config.siteNavs" :key="key" class="site" close-title close-width
                @click="commonlyFunctions.openLink(item.url, true)">
                <div style="display: flex;align-items: center;">
                    <Icon :icon="item.icon" height="30px" width="30px" />
                    <span style="margin-left: 10px">{{ item.name }}</span>
                </div>
            </Container>
            <i v-for="i in 3" class="placeholder"></i>
        </div>
    </Section>
</template>

<script setup>
import Section from "@/components/Section.vue";
import { inject } from "vue";
import Container from "@/components/Container.vue";
import Icon from "@/components/Icon.vue";
import commonlyFunctions from "@/composition/commonlyFunctions.js";

// 全局配置
const config = inject('config')

</script>

<style scoped>
/* 站内导航 */
.sites {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

/* 站点 */
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

/* 占位符 */
.placeholder {
    width: 24%;
}

/* 当屏幕宽度小于 800 时 */
@media only screen and (max-width: 800px) {

    /* 站点 */
    .site {
        width: 49%;
        transition: width 0.3s;
    }

    /* 占位符 */
    .placeholder {
        width: 49%;
    }
}
</style>