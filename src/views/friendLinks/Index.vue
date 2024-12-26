<template>
  <div class="friendLinks">
    <div class="description">
      <h1>
        <Icon icon="icon-sys-ya" height="38px" width="38px"/>
        友人帐
      </h1>
      <div class="description-content">
        <ContentView v-for="c in friendLinks.description" :content="c" img-height="200px" img-inline-block/>
      </div>
    </div>
    <Router/>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import Icon from "@/components/Icon.vue";
import ContentView from "@/components/ContentView.vue";
import {friendLinks} from "../../../config/FriendLinks.js";
</script>

<style scoped>
/* 描述 */
.description {
  background-color: #fff7f7;
  border-radius: 10px;
  padding: 10px;
}

/* 友链 */
.friendLinks {
  width: 80%;
  margin: 0 auto;
}
</style>