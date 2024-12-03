<template>
    <div>
      <!-- BackBar组件，显示当前类别作为标题 -->
      <BackBar :title="category" :isRoute="false" />
  
      <!-- HomeTabBar组件，可以根据需要定制 -->
      <HomeTabBar />
  
      <!-- 菜谱列表 -->
      <div class="categories-list">
        <div v-for="(recipe, index) in recipes" :key="index" class="recipe-item">
          <div class="recipe-image">
            <img :src="recipe.cover" alt="Recipe Image" />
          </div>
          <div class="recipe-info">
            <div class="recipe-title">{{ recipe.title }}</div>
            <div class="favorites-count">
              <span >评分：{{ recipe.mark }}; </span>
              <span>跟做人数：{{ recipe.follow }}</span>
            </div>
            <div class="user-info">
              <img :src="recipe.creatorAvatar" alt="User Avatar" class="user-avatar" />
              <span class="user-id">ID: {{ recipe.creator }}</span>
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
  
  const route = useRoute();
  const category = route.params.category; // 获取传递的类别参数
  
  const recipes = ref([]);
  
  // 模拟数据加载，根据类别加载不同的菜谱数据
  onMounted(() => {
    //滚动到页面顶部
    window.scrollTo(0, 0)

    recipes.value = getRecipesByCategory(category); // 获取对应类别的菜谱数据
  });
  
  // 根据类别获取菜谱数据（这里模拟数据）
  function getRecipesByCategory(category) {
    const allRecipes = {
      '粤菜': [
        { title: '宫保鸡丁', creator: '李雷', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '鱼香肉丝', creator: '张伟', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '麻婆豆腐', creator: '王芳', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '红烧肉', creator: '赵强', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '青椒土豆丝', creator: '周杰', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '炸酱面', creator: '孙颖', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '酸辣土豆丝', creator: '陈丽',creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6, follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '水煮牛肉', creator: '黄涛',creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34,  cover: 'https://via.placeholder.com/150' },
        { title: '炒面', creator: '刘凯', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '西红柿炒蛋', creator: '杨柳', creatorAvatar: 'https://via.placeholder.com/50',mark: 9.6, follow: 34, cover: 'https://via.placeholder.com/150' }
      ],
      '小食': [
        { title: '提拉米苏', creator: '李雯',creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34,  cover: 'https://via.placeholder.com/150' },
        { title: '巧克力慕斯', creator: '赵明',creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6, follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '草莓蛋糕', creator: '王晨', creatorAvatar: 'https://via.placeholder.com/50',mark: 9.6, follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '法式马卡龙', creator: '刘宁',creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6, follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '芒果布丁', creator: '杨雪', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '蓝莓芝士蛋糕', creator: '陈伟',creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6, follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '香蕉面包', creator: '王欣',creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6, follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '焦糖布丁', creator: '李琳', creatorAvatar: 'https://via.placeholder.com/50',mark: 9.6, follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '巧克力蛋糕', creator: '蒋琪',creatorAvatar: 'https://via.placeholder.com/50',  mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' },
        { title: '芝士蛋糕', creator: '周芳', creatorAvatar: 'https://via.placeholder.com/50', mark: 9.6,follow: 34, cover: 'https://via.placeholder.com/150' }
      ]
    };
  
    return allRecipes[category] || []; // 返回对应类别的数据
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

  .favorites-count {
  margin-top: 10px;
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
  font-size: 20px;
  color: #555;
}

  </style>
  