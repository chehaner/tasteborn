<template>
    <div>
      <!-- BackBar组件，传递title作为标题 -->
      <BackBar :title="title" :isRoute="false" />
      
      <!-- 排行第一的菜谱图片 -->
      <div class="top-ranking">
        <img :src="ranking[0]?.img" alt="Top Recipe" class="top-image" />
      </div>
  
      <!-- 排行榜数据，分为三列展示 -->
    <div class="ranking-detail">
      <ul class="ranking-list">
        <li v-for="(ranking, index) in ranking" :key="index" class="ranking-item" @click="goToRecipe(ranking.recipe_id)">
          <div class="ranking-item-sequence">{{ index + 1 }}</div>
          <div class="ranking-item-image">
            <img :src="ranking.img" alt="Recipe Image" class="recipe-image" />
          </div>
          <div class="ranking-item-info">
            <div class="recipe-name">{{ ranking.recipe_name }}</div>

            <!-- 根据title来动态显示不同的内容 -->
            <div class="favorites-count">
              <span v-if="title === '收藏榜'">收藏人数：{{ ranking.stars }}</span>
              <span v-else-if="title === '评分榜'">评分：{{ ranking.average_rate }}</span>
              <span v-else-if="title === '跟做榜'">跟做人数：{{ ranking.refered_count }}</span>
            </div>

            <div class="user-info">
              <img :src="ranking.picture" alt="User Avatar" class="user-avatar" />
              <span class="user-id">ID: {{ ranking.nickname }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  
      <!-- 底部Tab组件 -->
      <BottomTab />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import BackBar from '@/components/Common/BackBar.vue';
  import BottomTab from '@/components/Common/BottomTab.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getCollectRank, getRateRank, getFollowRank } from '@/api/category';
  const route = useRoute();
  const router = useRouter();
  const title = route.params.title; // 获取传递过来的 title 参数
  // 定义动态排行榜数据
  const ranking = ref([])
  // const ratingRankings = ref([])
  // const followRankings = ref([])
  onMounted(() => {
    if (title == "收藏榜"){
      getCollectRankData();
    }
    if (title == "评分榜"){
      getRateRankData();
    }
    if (title == "跟做榜"){
      getFollowRankData();
    }
  })
  async function getCollectRankData() {
    const res = await getCollectRank();
    ranking.value = res.data
  }
  async function getRateRankData() {
    const res = await getRateRank();
    ranking.value = res.data
  }
  async function getFollowRankData() {
    const res = await getFollowRank();
    ranking.value = res.data
  }

  // 跳转到菜谱详情页面
function goToRecipe(recipeId) {
  router.push({ path: `/recipes/${recipeId}` });
}

  </script>
  
  <style scoped>
  /* 整个页面的布局 */
  .ranking-detail {
    padding: 10px;
    background-color: rgb(253, 250, 244);
    margin-bottom:40px;
  }
  
  /* 排行第一的菜谱图片 */
  .top-ranking {
    margin-bottom: 10px;
    text-align: center;
  }
  
  .top-image {
    width: 100%;
    height: 300px;
    border-radius: 10px;
  }
  
  /* 排行榜数据的布局 */
.ranking-list {
  list-style-type: none;
  padding: 0;
}

.ranking-item {
  display: grid;
  grid-template-columns: 30px 150px 1fr;  /* 分为三列：序号、图片、详情 */
  gap: 10px;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.ranking-item-sequence {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.ranking-item-image {
  text-align: center;
}

.recipe-image {
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
}

.ranking-item-info {
  text-align: left;
}

.recipe-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.favorites-count {
  margin-top: 5px;
  font-size: 20px;
  margin-bottom: 5px;
  color: #888;
}

.user-info {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 8px;
}

.user-id {
  font-size: 18px;
  color: #555;
}
  </style>
  