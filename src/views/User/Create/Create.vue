<template>
  <div class="user-history">
    <BackBar title="我的创作" route-link="/user" :is-route="true"></BackBar>
    <!-- 顶部菜单 -->
    <div class="menu-bar">
      <div 
        class="menu-item" 
        :class="{ active: currentTab === 'recipe' }" 
        @click="switchTab('recipe')">
        菜谱
      </div>
      <div 
        class="menu-item" 
        :class="{ active: currentTab === 'blog' }" 
        @click="switchTab('blog')">
        动态
      </div>
    </div>
    <div class="history-content" :class="{'history-content-center': isNull}">
      <div class="history-list" v-if="!isNull">
          <LibraryContentItem
            :id="currentTab === 'recipe' ? item.recipe_id : item.blog_id"
            :pic-url="currentTab === 'recipe' ? item.img : item.photo_url" 
            :name="currentTab === 'recipe' ? item.recipe_name : item.content" 
            :author="item.nickname"
            :avatar="item.picture"
            :stars="currentTab === 'recipe' ? item.stars : item.likes" 
            v-for="item in createList"
            :key="item.id"
            :flag="currentTab === 'recipe' ? 0 : 1"
          />
          <!-- <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        </van-list> -->
      </div>
      <van-empty description="暂无创作记录" v-else />
    </div>
  </div>
</template>

<script setup>
import BackBar from "@/components/Common/BackBar.vue";
import { isLogin } from "@/utils/isLogin";
import LibraryContentItem from "@/components/Library/LibraryContentItem.vue";
import { getUserCollect, getUserCreate } from "@/api/user";
import { onMounted, ref } from "vue";
import { Snackbar } from "@varlet/ui";

const isNull = ref(false);
// const loading = ref(true);
const finished = ref(false);
const limit = ref(20);
const page = ref(1);
const createList = ref([]);
const currentTab = ref("recipe"); // 默认选择 "recipe" 菜谱
// isLogin('请登录!', '/user');

onMounted(() => {
  initCreate(currentTab.value);
});
// 切换标签
function switchTab(tab) {
  currentTab.value = tab;
  createList.value = []; // 清空之前的创作列表
  page.value = 1; // 重置页码
  initCreate(tab); // 重新加载数据
}
// 初始化历史记录
async function initCreate(tab) {
  const user_id = localStorage.getItem('user_id')
  const res = await getUserCreate(user_id, tab);
  if (res.status === 204) return isNull.value = true;
  // if (res.data.list.length < limit.value) {
  //   finished.value = true;
  //   loading.value = true;
  // }
  // createList.value = [...createList.value, ...res.data.list];
  createList.value = res.list
  // setTimeout(() => {
  //   loading.value = false;
  // }, 0);
}

// // 下拉加载
// function onLoad() {
//   page.value++;
//   // initCreate();
// }
</script>
  
  <style scoped lang="scss">
.menu-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: white;
  border-bottom: 1px solid #ddd;
}
.menu-item {
  text-decoration: none;
  font-size: 20px;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
/* 当前激活路由的样式 */
.menu-item.active {
  font-weight: bold;
  color: #39C5BB;
  border-bottom: 5px solid #39C5BB;
}
  .history-content {
    background-color: #fff;
  }
  .history-content-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .history-list {
  }
  :deep(.van-empty) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  </style>
  