<template>
  <div class="user-collect">
    <BackBar title="我的收藏" route-link="/user" :is-route="true"></BackBar>
    <div class="collect-content">
      <van-empty description="暂无收藏数据!" v-if="isNull" />
      <div class="collect-list" v-else>
          <LibraryContentItem
            :id="item.recipe_id"
            :pic-url="item.img"
            :name="item.recipe_name"
            :author="item.nickname"
            :avatar="item.picture"
            v-for="item in collectList"
            :key="item.id"
          >
          </LibraryContentItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isLogin } from "@/utils/isLogin";
import BackBar from "@/components/Common/BackBar.vue";
import LibraryContentItem from "@/components/Library/LibraryContentItem.vue";
import { getUserCollect } from "@/api/user";
import {onMounted, ref} from "vue";
import {Snackbar} from "@varlet/ui";

const limit = ref(20)
const page = ref(1)
const isNull = ref(false)
const finished = ref(false)
const loading = ref(true)
const collectList = ref([])

// isLogin('请登录!', '/user')

onMounted(() => {
  // 初始化收藏数据
  initUserCollect()
})

// 获取收藏数据
async function initUserCollect() {
  const user_id = localStorage.getItem('user_id')
  const res = await getUserCollect( user_id )
  if (res.status === 204) return isNull.value = true
  // if (res.status !== 200 && res.status !== 403) return Snackbar.error('请登录!')
  // if (res.data.list.length < limit.value) {
  //   finished.value = true
  //   loading.value = true
  // }
  collectList.value = res.data
  // setTimeout(() => {
  //   loading.value = false
  // }, 0)
}
// 下滑加载数据
// function onLoad() {
//   page.value++
//   initUserCollect()
// }

</script>

<style scoped lang="scss">
.user-collect {
  background-color: #fff;
}
</style>
