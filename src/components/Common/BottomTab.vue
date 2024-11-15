<template>
  <div class="bottom-tab">
    <var-bottom-navigation :active="props.active" fixed safe-area active-color="#147D42">
      <!-- <var-bottom-navigation-item
        :name="item.name"
        :label="item.name"
        :icon="item.icon"
        v-for="(item, index) in tabList"
        :key="index"
        @click="routerJump(item.url)"/> -->
      <var-bottom-navigation-item label='首页' icon='home' @click="routerJump('/')"></var-bottom-navigation-item>
      <var-bottom-navigation-item label='分类' icon='notebook' @click="routerJump('/library')"></var-bottom-navigation-item>
      <var-bottom-navigation-item @click="routerJump('/')"></var-bottom-navigation-item>
      <var-bottom-navigation-item label='动态' icon='radio-marked' @click="routerJump('/')"></var-bottom-navigation-item>
      <var-bottom-navigation-item label='我的' icon='account-circle' @click="routerJump('/user')"></var-bottom-navigation-item>
    </var-bottom-navigation>
    <div class="floating-create-button" @click="routerJump('/')">
      <var-icon name="plus-circle" size="36"></var-icon>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

// const tabList = ref([
//   { name: '首页', icon: 'home', url: '/' },
//   { name: '分类', icon: 'notebook', url: '/library' },
//   { name: '创建', icon: 'plus-circle', url: '/' },
//   { name: '动态', icon: 'radio-marked', url: '/home' },
//   { name: '我的', icon: 'account-circle', url: '/user' }]
// )

const props = defineProps({
  active: {
    type: Number,
    default: 0
  }
})

function routerJump(url) {
  window.location.href = url
}
</script>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}
.bottom-tab {
  :deep(.var-bottom-navigation-item__label) {
    font-size: 12px !important;
    font-weight: bold;
  }
  :deep(.var-bottom-navigation--fixed) {
    z-index: 20 !important;
  }
  .floating-create-button {
  position: fixed;
  bottom: 30px;
  left: 50%;
  border-radius: 50%;
  transform: translateX(-50%);
  color: #646566;
  cursor: pointer;
  z-index: 21; /* 确保按钮在导航栏之上 */
}
}
</style>
