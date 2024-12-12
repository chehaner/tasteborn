<template>
  <div class="user-collect">
    <BackBar title="大家交的作业" route-link="/home" :is-route="true"></BackBar>
    <div class="collect-content">
      <van-empty description="暂无数据!" v-if="isNull" />
      <div class="collect-list" v-else>
          <LibraryContentItem
            :id="item.blog_id"
            :pic-url="item.images[0]"
            :name="item.content"
            :author="item.author.nickname"
            :avatar="item.author.picture"
            v-for="item in blogInfo"
            :key="item.author_id"
            :stars="item.likes"
            :flag=1
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
import { getReferBlog } from "@/api/novel";
const isNull = ref(false)
const blogInfo = ref({})
// isLogin('请登录!', '/user')
import { useRoute } from 'vue-router';
// 获取路由信息
onMounted(() => {
  // 初始化收藏数据
  const route = useRoute();
  const recipeId = route.params.recipe_id;
  initUserCollect(recipeId)
})
const getFirstItem = (array) => {
  return array.slice(0, 1);  // 直接返回数组的第一项
};
// 获取收藏数据
async function initUserCollect(recipe_id) {
  const res = await getReferBlog(recipe_id);
  if (res.status === 204) return isNull.value = true
  blogInfo.value = res.data;
}

</script>

<style scoped lang="scss">
.user-collect {
  background-color: #fff;
}
</style>
