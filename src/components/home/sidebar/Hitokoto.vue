<template>
  <container height="auto" title="一言" width="100%">
    <div class="hitokoto">
      <p class="content">{{ hitokotoContent }}</p>
      <br>
      <p class="from">{{ hitokotoFrom }}</p>
    </div>
  </container>
</template>

<script setup>
import Container from "@/components/Container.vue";
import {onMounted, ref} from "vue";

// 内容
let hitokotoContent = ref('');
// 出处
let hitokotoFrom = ref('');

onMounted(() => {
  // 从本地获取一言
  let hitokoto = localStorage.getItem('hitokoto');

  // 如果不为空的话优先使用本地的数据
  if (hitokoto) {
    hitokoto = JSON.parse(hitokoto);
    run(hitokoto);
  } else {
    // 如果为空的话从接口获取
    getHitokoto(true);
  }

  // 更新本地缓存
  getHitokoto(false);
});


// 执行逻辑
function run(hitokoto) {
  typewriter(hitokoto.hitokoto);
  let who = hitokoto.from_who ? hitokoto.from_who : '';
  hitokotoFrom.value = `《${hitokoto.from}》${who}`;
}

// 获取一言
function getHitokoto(isRunDirectly) {
  fetch('https://v1.hitokoto.cn')
      .then(response => response.json())
      .then(data => {
        if (isRunDirectly) {
          run(data);
        }
        localStorage.setItem('hitokoto', JSON.stringify(data));
      })
      .catch(console.error)
}

// 打字机效果
function typewriter(str) {
  let j = 0;
  let arr = str.split("");
  let timer = setInterval(() => {
    if (j < arr.length) {
      hitokotoContent.value += arr[j++];
    } else {
      clearInterval(timer);
    }
  }, 200);
}
</script>

<style scoped>
/* 内容 */
.content {
  padding-top: 10px;
  font-size: 15px;
}

/* 出处 */
.from {
  font-size: 15px;
  text-align: right;
}

/* 光标动画 */
.content::after {
  content: "|";
  animation: blink 1s infinite;
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>