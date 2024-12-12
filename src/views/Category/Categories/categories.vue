<template>
  <div>
    <!-- BackBar组件，显示当前类别作为标题 -->
    <BackBar :title="categoryName" :isRoute="false" />

    <!-- HomeTabBar组件，可以根据需要定制 -->
    <HomeTabBar />

    <!-- 菜谱列表 -->
    <div class="categories-list">
      <div v-for="(recipe, index) in recipes" :key="index" class="recipe-item">
        <div class="recipe-image">
          <img :src="recipe.img" alt="Recipe Image" />
        </div>
        <div class="recipe-info">
          <div class="recipe-title">{{ recipe.recipe_name }}</div>
          <!-- 作者和收藏放在同一行 -->
          <div class="user-info-star">
            <div class="user-info">
              <img :src="recipe.picture" alt="User Avatar" class="user-avatar" />
              <span class="user-id">{{ recipe.nickname }}</span>
            </div>
            <!-- 收藏 -->
            <div class="star-container">
              <Star theme="outline" size="17" class="star-icon" />
              <span class="star-text">{{ recipe.stars }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部Tab组件 -->
    <BottomTab />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BackBar from '@/components/Common/BackBar.vue';
import HomeTabBar from '@/components/Home/HomeTabBar.vue';
import BottomTab from '@/components/Common/BottomTab.vue';
import { getRecipeByTag } from '@/api/category';
import { Star } from "@icon-park/vue-next";
const route = useRoute();
// const category = route.params.category; // 获取传递的类别参数
const category = route.query.value;
const categoryName = ref(route.query.name || "默认类别");
const recipes = ref([]);

// 模拟数据加载，根据类别加载不同的菜谱数据
onMounted(() => {
  // 滚动到页面顶部
  window.scrollTo(0, 0)
  getRecipesByCategory(category); // 获取对应类别的菜谱数据
});

// 根据类别获取菜谱数据（这里模拟数据）
async function getRecipesByCategory(category) {
  const res = await getRecipeByTag(category);
  recipes.value = res.data
}
</script>

<style scoped>
.categories-list {
  background-color: rgb(253, 250, 244);
}

.recipe-item {
  display: grid;
  grid-template-columns: 200px 250px;
  align-items: center;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recipe-image {
  width: 180px;
  height: 130px;
  margin-right: 20px;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.recipe-info {
  flex-grow: 1;
}

.recipe-title {
  font-size: 22px;
  font-weight: bold;
}

/* 新增样式：将作者信息和收藏信息放在同一行 */
.user-info-star {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 8px;
}

.user-id {
  font-size: 20px;
  color: #555;
}

.star-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.star-icon {
  margin-right: 5px;
}

.star-text {
  font-size: 18px;
  color: #888;
}

</style>
