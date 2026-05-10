<template>
    <div class="content-view">
        <component
            v-for="(content, index) in contentList"
            :key="index"
            :is="getElementType(content.tag)"
            v-bind="content.attributes"
        >
            {{ content.text }}
        </component>
    </div>
</template>

<script setup lang="ts">
import Image from "@/components/contentView/Image.vue";
import { onMounted, ref, watch } from "vue";
import LiView from "@/components/contentView/LiView.vue";

interface ContentItem {
    tag: string;
    text: string;
    attributes?: Record<string, unknown>;
}

interface SplitResult {
    type: string;
    content: string;
}

interface Props {
    contents?: string[];
    imgWidth?: string;
    imgHeight?: string;
    imgInlineBlock?: boolean;
}

const props = defineProps<Props>();

const contentList = ref<ContentItem[]>([]);

function parseContents(): ContentItem[] {
    const newContentList: ContentItem[] = [];

    for (let i = 0; i < props.contents?.length; i++) {
        const content = props.contents[i];
        const el: ContentItem = {
            tag: getType(content),
            text: getContent(content),
        };

        if (getElementType(content) === LiView) {
            el.attributes = {
                type: el.tag,
                contents: [] as string[],
            };
            for (
                ;
                i < props.contents.length &&
                el.tag === getType(props.contents[i]);
                i++
            ) {
                (el.attributes.contents as string[]).push(
                    getContent(props.contents[i]),
                );
            }
            i--;
            newContentList.push(el);
            continue;
        }

        el.attributes = getAttributes(content);
        newContentList.push(el);
    }

    return newContentList;
}

watch(
    () => props.contents,
    () => {
        contentList.value = parseContents();
    },
    { deep: true },
);

onMounted(() => {
    contentList.value = parseContents();
});

function addContent(content: ContentItem): void {
    contentList.value.push(content);
}

function getContent(content: string): string {
    return splitContent(content).content;
}

function getType(content: string): string {
    return splitContent(content).type;
}

function getElementType(content: string): unknown {
    const c = getType(content);

    switch (c) {
        case "img":
            return Image;
        case "ol":
        case "ul":
            return LiView;
        default:
            return c;
    }
}

function getAttributes(content: string): Record<string, unknown> {
    const type = getElementType(content);
    if (type === Image) {
        return {
            src: getContent(content),
            alt: "图片",
            width: props.imgWidth,
            height: props.imgHeight,
            InlineBlock: props.imgInlineBlock,
        };
    }
    return {};
}

function splitContent(content: string): SplitResult {
    const c = String(content);
    const split = c.split(":");

    if (split.length > 2) {
        for (let i = 2; i < split.length; i++) {
            split[1] += ":" + split[i];
        }
    }

    return {
        type: split[0],
        content: split[1],
    };
}
</script>

<style scoped>
.content-view {
    display: block;
    width: 100%;
}

* {
    text-align: left;
    margin: 15px 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 1.6;
    transition: all 0.3s ease;
}

h1 {
    text-align: center;
    font-size: 28px;
    margin: 20px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #e2e8f0;
    color: #2d3748;
}

h2 {
    font-size: 24px;
    margin: 18px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
    color: #2d3748;
}

h3 {
    font-size: 20px;
    margin: 16px 0;
    padding-left: 15px;
    border-left: 5px solid #6e8efb;
    color: #2d3748;
}

p {
    height: auto;
    letter-spacing: 0.5px;
    color: #4a5568;
    margin: 15px 0;
}

ul,
ol {
    padding-left: 25px;
    margin: 15px 0;
}

li {
    margin: 8px 0;
    color: #4a5568;
}

img {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    max-width: 100%;
}

img:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

blockquote {
    border-left: 4px solid #6e8efb;
    padding-left: 20px;
    margin: 20px 0;
    color: #4a5568;
    font-style: italic;
    background: rgba(110, 142, 251, 0.05);
    border-radius: 0 8px 8px 0;
    padding: 15px;
}

code {
    background: rgba(110, 142, 251, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    color: #2d3748;
}

pre {
    background: rgba(30, 30, 30, 0.9);
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

pre code {
    background: transparent;
    padding: 0;
    color: inherit;
}

a {
    color: #6e8efb;
    text-decoration: none;
    transition: all 0.3s ease;
}

a:hover {
    color: #a777e3;
    text-decoration: underline;
}
</style>
