<template>
    <div>
      <!-- BackBar组件，传递title作为标题 -->
      <BackBar :title="title" :isRoute="false" />
      
      <!-- 排行第一的菜谱图片 -->
      <div class="top-ranking">
        <img :src="rankings[0]?.cover" alt="Top Recipe" class="top-image" />
      </div>
  
      <!-- 排行榜数据，分为三列展示 -->
    <div class="ranking-detail">
      <ul class="ranking-list">
        <li v-for="(ranking, index) in rankings" :key="index" class="ranking-item">
          <div class="ranking-item-sequence">{{ index + 1 }}</div>
          <div class="ranking-item-image">
            <img :src="ranking.cover" alt="Recipe Image" class="recipe-image" />
          </div>
          <div class="ranking-item-info">
            <div class="recipe-name">{{ ranking.title }}</div>

            <!-- 根据title来动态显示不同的内容 -->
            <div class="favorites-count">
              <span v-if="title === '收藏榜'">收藏人数：{{ ranking.favoritesCount }}</span>
              <span v-else-if="title === '评分榜'">评分：{{ ranking.mark }}</span>
              <span v-else-if="title === '跟做榜'">跟做人数：{{ ranking.follow }}</span>
            </div>

            <div class="user-info">
              <img :src="ranking.creatorAvatar" alt="User Avatar" class="user-avatar" />
              <span class="user-id">ID: {{ ranking.creatorId }}</span>
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
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const title = route.params.title; // 获取传递过来的 title 参数
  
  // 模拟排行榜数据
  const rankings = ref([]);
  
  // 模拟数据加载
  onMounted(() => {
    // 使用 title 获取对应的排行榜数据
    rankings.value = getRankingsByTitle(title); // 根据title获取对应排行榜数据
  });
  
  // 根据 title 获取排行榜数据（这里模拟数据）
  function getRankingsByTitle(title) {
    // 模拟不同排行榜数据
    const allRankings = {
      '收藏榜': [
        { 
          title: '菜谱1', 
          creator: '作者1', 
          cover: 'https://via.placeholder.com/150', 
          favoritesCount: 150, 
          creatorAvatar: 'https://via.placeholder.com/50', 
          creatorId: 'user1' 
        },
        { 
          title: '菜谱2', 
          creator: '作者2', 
          cover: 'https://via.placeholder.com/150', 
          favoritesCount: 120, 
          creatorAvatar: 'https://via.placeholder.com/50', 
          creatorId: 'user2' 
        },
        { 
          title: '菜谱3', 
          creator: '作者3', 
          cover: 'https://via.placeholder.com/150', 
          favoritesCount: 100, 
          creatorAvatar: 'https://via.placeholder.com/50', 
          creatorId: 'user3' 
        },
        // 更多数据...
      ],
      '评分榜': [
        { 
          title: '饮品1', 
          creator: '作者A', 
          cover: 'https://via.placeholder.com/150', 
          mark: 9.6, 
          creatorAvatar: 'https://via.placeholder.com/50', 
          creatorId: 'userA' 
        },
        { 
          title: '饮品2', 
          creator: '作者B', 
          cover: 'https://via.placeholder.com/150', 
          mark: 9.3, 
          creatorAvatar: 'https://via.placeholder.com/50', 
          creatorId: 'userB' 
        },
        // 更多数据...
      ],
      '跟做榜': [
        { 
          title: '饮品1', 
          creator: '作者A', 
          cover: 'https://via.placeholder.com/150', 
          follow: 34, 
          creatorAvatar: 'https://via.placeholder.com/50', 
          creatorId: 'userA' 
        },
        { 
          title: '饮品2', 
          creator: '作者B', 
          cover: 'https://via.placeholder.com/150', 
          follow: 22, 
          creatorAvatar: 'https://via.placeholder.com/50', 
          creatorId: 'userB' 
        },
        // 更多数据...
      ]
    };
  
    return allRankings[title] || []; // 返回对应排行榜的数据
  }
  </script>
  
  <style scoped>
  /* 整个页面的布局 */
  .ranking-detail {
    padding: 10px;
    background-color: rgb(253, 250, 244);
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
  