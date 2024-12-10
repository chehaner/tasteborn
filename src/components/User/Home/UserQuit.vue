<template>
  <div class="user-quit" v-show="username">
    <var-button block type="primary" color="#ff7512" @click="onQuit">退出登录</var-button>
    <var-dialog
      title="提示"
      message="是否退出登录!"
      v-model:show="show"
      @confirm="confirmQuit"
      confirm-button-text-color="#189a7c"
      cancel-button-text-color="#189a7c"
    />
  </div>
</template>

<script setup>

import {ref} from "vue";

const props = defineProps({
  username: {
    type: String,
    default: ""
  }
})

const show = ref(false)

// 显示提示框
function onQuit() {
  show.value = true
}
// 提示框按下确认
function confirmQuit() {
  localStorage.clear('token')
  setTimeout(() => {
    location.reload()
  }, 100)
}
</script>

<style scoped lang="scss">
.user-quit {
  padding: 10px 15px;
}
</style>
