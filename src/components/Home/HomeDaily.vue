<template>
  <div class="home-daily-list">
    <div class="home-daily-item" v-for="item in recipeList" :key="item.recipe_id">
      <HomeList
        :id="item.recipe_id"
        :img="item.img"
        :name="item.recipe_name"
        :avatar="item.picture"
        :author_name="item.nickname"
        :star="item.stars"
      />
    </div>
    <var-loading type="wave" v-if="isLoading" color="#ff3992" />
  </div>
</template>
<script setup>
import HomeList from "@/components/Home/HomeList.vue";
import { getrecipe } from "@/api/home";
import { onMounted, ref } from "vue";

const limit = ref(20);
const page = ref(1);
const recipeList = ref([]); // 存储菜谱数据
const isLoading = ref(true);

onMounted(() => {
  getRecipe(); // 初始化每日推荐数据
  // 获取recipes表的所有数据
  // 每一行中搜索user表：user_id = author_id的行，并把
});

async function getRecipe() {
  const res = await getrecipe();
  if (res) {
    recipeList.value = res; // 数据赋值
  }
  setTimeout(() => {
    isLoading.value = false; // 数据加载完成
  }, 0);
}
</script>

<style scoped lang="scss">
.home-daily-list {
  display: flex;
  flex-wrap: wrap; /* 支持多行 */
  justify-content: space-between; /* 子项均匀分布 */
}

.home-daily-item {
  width: calc(50%); /* 两个子项一行，减去间距的一半 */
}

.home-daily-list::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}

.home-daily-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
