<template>
    <div class="section-container" :class="{ 'section-hover': hoverable }">
        <!-- 标题区域 -->
        <div v-if="showHeader" class="section-header">
            <!-- 图标 -->
            <Icon
                v-if="icon && showIcon"
                :icon="icon"
                :height="iconSize"
                :width="iconSize"
                class="section-icon"
            />
            <!-- 标题 -->
            <span class="section-title" :style="titleStyle">{{ title }}</span>
            <!-- 装饰线 -->
            <div class="section-divider" :style="dividerStyle"></div>
        </div>

        <!-- 内容区域 -->
        <div class="section-content" :style="contentStyle">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "@/components/Icon.vue";

/**
 * Section 组件属性定义
 */
interface Props {
    /** 图标名称（iconfont 类名） */
    icon?: string;
    /** 标题文本 */
    title?: string;
    /** 是否显示头部（标题+图标） */
    showHeader?: boolean;
    /** 是否显示图标 */
    showIcon?: boolean;
    /** 图标尺寸 */
    iconSize?: string;
    /** 标题颜色 */
    titleColor?: string;
    /** 标题字体大小 */
    titleSize?: string;
    /** 标题字体粗细 */
    titleWeight?: string;
    /** 分割线颜色 */
    dividerColor?: string;
    /** 是否启用悬停效果 */
    hoverable?: boolean;
    /** 背景颜色 */
    bgColor?: string;
    /** 圆角大小 */
    borderRadius?: string;
    /** 内边距 */
    padding?: string;
    /** 外边距（底部） */
    marginBottom?: string;
}

/**
 * 组件属性默认值
 */
const props = withDefaults(defineProps<Props>(), {
    icon: "",
    title: "",
    showHeader: true,
    showIcon: true,
    iconSize: "40px",
    titleColor: "#2d3748",
    titleSize: "24px",
    titleWeight: "700",
    dividerColor: "#6e8efb",
    hoverable: true,
    bgColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "12px",
    padding: "10px",
    marginBottom: "20px",
});

/**
 * 标题样式计算
 */
const titleStyle = computed(() => ({
    color: props.titleColor,
    fontSize: props.titleSize,
    fontWeight: props.titleWeight,
}));

/**
 * 分割线样式计算
 */
const dividerStyle = computed(() => ({
    backgroundColor: props.dividerColor,
}));

/**
 * 内容区域样式计算
 */
const contentStyle = computed(() => ({
    padding: props.padding,
}));
</script>

<style scoped>
/**
 * 容器基础样式
 */
.section-container {
    border-radius: v-bind("borderRadius");
    background-color: v-bind("bgColor");
    overflow: hidden;
    padding: 10px;
    margin-bottom: v-bind("marginBottom");
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

/**
 * 悬停效果
 */
.section-hover:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.7);
}

/**
 * 头部区域
 */
.section-header {
    display: flex;
    align-items: center;
    padding: 10px 0;
    position: relative;
}

/**
 * 图标
 */
.section-icon {
    flex-shrink: 0;
    margin-right: 12px;
    transition: transform 0.3s ease;
}

.section-hover:hover .section-icon {
    transform: scale(1.1);
}

/**
 * 标题
 */
.section-title {
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    background: inherit;
    padding-right: 15px;
}

/**
 * 分割线
 */
.section-divider {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    margin-left: 10px;
    transition: width 0.5s ease;
}

.section-hover:hover .section-divider {
    width: 100%;
}

/**
 * 内容区域
 */
.section-content {
    margin-top: 20px;
    position: relative;
}

/**
 * 响应式设计
 */
@media (max-width: 768px) {
    .section-container {
        padding: 15px;
        margin-bottom: 15px;
    }

    .section-header {
        padding: 8px 0;
    }

    .section-content {
        margin-top: 15px;
    }
}
</style>
