<template>
  <div class="novel-back">
    <var-app-bar :color="isTabColor ? '#fff' : 'transparent'" elevation="0">
      <template #left>
        <var-button
          color="transparent"
          text-color="#fff"
          round
          text
          @click="onBack"
        >
          <arrow-left theme="outline" size="0.35rem" :fill="isTabColor ? '#000' : '#fff'" strokeLinejoin="bevel" strokeLinecap="square"/>
        </var-button>
      </template>
      <template #right>
        <var-button
          color="transparent"
          text-color="#fff"
          round
          text
          @click="onLink"
        >
          <home theme="outline" size="0.35rem" :fill="isTabColor ? '#000' : '#fff'" strokeLinejoin="bevel" strokeLinecap="square"/>
        </var-button>
      </template>
    </var-app-bar>
  </div>
</template>

<script setup>
import { ArrowLeft, Home } from "@icon-park/vue-next";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const isTabColor = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop

    isTabColor.value = scrollTop >= 54;
  })
})

function onLink() {
  window.location.href = '/'
}


function onBack() {
  router.back()
}
</script>

<style scoped lang="scss">
.novel-back {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: transparent; // 初始背景透明
  transition: background-color 0.3s ease; // 平滑过渡
}

.novel-back.isTabColor {
  background-color: rgba(255, 255, 255, 0.8); // 滑动后背景变为半透明白色
}

:deep(.var-app-bar) {
  border: none; // 去掉可能存在的边框
  box-shadow: none; // 去掉阴影
}

:deep(.var-app-bar__toolbar) {
  height: 0.8rem; // 控制工具栏高度
}

:deep(.var-button) {
  transition: color 0.3s ease; // 按钮文字颜色平滑过渡
}

:deep(.var-button:hover) {
  background-color: rgba(255, 255, 255, 0.2); // 鼠标悬停时，按钮背景颜色浅透明
}
</style>
