<template>
  <div class="avatar">
    <img :src="config.avatar" alt="阿巴阿巴~"/>
    <div class="avatar-status">
      <span id="icon">{{ config.avatar_status.icon }}</span>
      <span id="text">{{ config.avatar_status.text }}</span>
    </div>
  </div>
  <container close-title>
    {{ config.description }}
  </container>
</template>

<script setup>
import { inject } from "vue";
import Container from "@/components/Container.vue";

const config = inject('config')
</script>

<style scoped>
.avatar {
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-status {
  width: 30px;
  height: 30px;

  position: absolute;
  bottom: 10%;
  left: 80%;

  font-size: 20px;
  background-color: white;

  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding-left: 1px;

  overflow: hidden;
  transition: width 0.3s ease, transform 0.3s ease;
}

.avatar-status:hover {
  width: 120px;
  z-index: 999;
}

#icon {
  display: inline-block;
}

#text {
  display: inline-block;
  margin-left: 5px;
}
</style>