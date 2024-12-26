<template>
  <i id="top"></i>
  <a id="pastTop" href="#top" title="回到顶部">↑</a>
</template>

<script setup>

</script>

<style scoped>
/* 回到顶部 */
#pastTop {
  position: fixed;
  width: 30px;
  height: 30px;
  bottom: 30px;
  right: 10px;
  background-color: white;
  text-decoration: none;
  text-align: center;
  line-height: 30px;
  font-weight: bolder;
  font-size: 20px;
  color: black;
  border-radius: 10px;
  transition: background-color 0.5s, color 0.5s;
}
</style>