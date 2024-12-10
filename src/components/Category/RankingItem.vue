<template>
  <div class="ranking-item" @click="goToRankingPage">
    <div class="ranking-content">
      <!-- 第一名菜谱 -->
      <div class="ranking-details">
        <img :src="props.rankings[0]?.img" alt="Cover"/>
      </div>

      <!-- 排行前三 -->
      <div class="ranking-details">
        <h3>{{ title }}</h3>
        <ul>
          <li v-for="(ranking, index) in props.rankings.slice(0, 4)" :key="index" class="ranking-list-item">
            <!-- 左侧是序号 -->
            <span class="ranking-index">{{ index + 1 }}</span>
            <!-- 右侧是菜谱名和作者 -->
            <div class="ranking-info">
              {{ ranking.recipe_name }} BY {{ ranking.nickname }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  rankings: {
    type: Array,
    required: true
  }
});

const router = useRouter();

// 跳转到排行榜详情页面
function goToRankingPage() {
   setTimeout(() => {
    router.push({
      path: `/category/ranking/${props.title}`,
    });
  }, 0);
}
</script>

<style scoped>
.ranking-item {
  margin: 0px 10px 10px 10px;
  padding: 5px 10px 5px 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* 改为可以点击的手形光标 */
}



.ranking-content {
  display: flex;
  margin-top: 5px;
  gap: 15px;
}

.ranking-details {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.ranking-details img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.ranking-details h3 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
}

.ranking-details ul {
  list-style-type: none;
  padding: 0;
}

.ranking-list-item {
  display: flex;
  align-items: center;
  margin: 0px 0px 10px 0px;
  font-size: 20px;
}

.ranking-index {
  font-size: 25px;
  font-weight: bold;
  width: 30px; /* 保证序号有一定的宽度 */
  text-align: left;
  margin-left: 5px;
}

.ranking-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}


</style>
