<template>
  <div style="display: inline-block" class="icon-wrapper">
    <svg :style="{width: width, height: height}" aria-hidden="true" class="icon">
      <use :xlink:href='`#${icon}`'></use>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '1em'
  },
  height: {
    type: String,
    default: '1em'
  }
})
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 悬停效果 */
a:hover .icon,
button:hover .icon,
.routing:hover .icon,
.social-link:hover .icon,
.project:hover .icon,
.site:hover .icon {
  fill: #6e8efb;
  transform: scale(1.1);
}

/* 特殊图标效果 */
.icon[href*="icon-sys-setting"] {
  transition: transform 0.5s ease;
}

.icon-wrapper:hover .icon[href*="icon-sys-setting"] {
  transform: rotate(120deg);
}
</style>