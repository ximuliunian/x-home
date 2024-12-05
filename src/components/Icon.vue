<template>
  <svg :style="{width: width, height: height}" aria-hidden="true" class="icon">
    <use :xlink:href='`#${icon}`'></use>
  </svg>
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
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>