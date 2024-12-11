<template>
    <div class="category-page">
      <!-- 搜索栏 -->
      <HomeTabBar />
      <!-- 次级菜单 -->
      <HomeMenuBar />
      <!-- 排行榜 -->
      <div class="ranking-section">
        <div class="ranking-header">
          <h2>排行榜</h2>
        </div>
        <RankingItem 
          title="收藏榜"
          :rankings="collectRankings"
        />
        <RankingItem 
          title="评分榜"
          :rankings="ratingRankings"
        />
        <RankingItem 
          title="跟做榜"
          :rankings="followRankings"
        />
      </div>
      <!-- 分类 -->
      <div class="category-section">
        <!-- 菜系分类 -->
        <CategoryItem title="菜系" :categories="cuisineCategories" />
        
        <!-- 餐次分类 -->
        <CategoryItem title="餐次" :categories="mealTimeCategories" />
        
        <!-- 人群分类 -->
        <CategoryItem title="人群" :categories="targetAudienceCategories" />
      </div>
  

      <div class="whitespace">

      </div>


      <!-- 底部 Tab -->
      <BottomTab />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import BottomTab from '@/components/Common/BottomTab.vue';
  import HomeMenuBar from '@/components/Home/HomeMenuBar.vue';
  import HomeTabBar from '@/components/Home/HomeTabBar.vue';
  import RankingItem from '@/components/Category/RankingItem.vue';
  import CategoryItem from '@/components/Category/CategoryItem.vue';
  import { getCollectRank, getRateRank, getFollowRank } from '@/api/category';
  const collectRankings = ref([])
  // const ratingRankings = ref([])
  // const followRankings = ref([])
  // 模拟排行榜数据
  // const collectRankings = ref([]);
  onMounted(() => {
    getCollectRankData();
    getRateRankData();
    getFollowRankData();
  })
  async function getCollectRankData() {
    const res = await getCollectRank();
    collectRankings.value = res.data.splice(0,3)
  }
  async function getRateRankData() {
    const res = await getRateRank();
    ratingRankings.value = res.data.splice(0,3)
  }
  async function getFollowRankData() {
    const res = await getFollowRank();
    followRankings.value = res.data.splice(0,3)
  }
  // 模拟排行榜数据
  // const collectRankings = ref([
  //   {
  //     cover: 'https://via.placeholder.com/150',
  //     title: '番茄炒蛋',
  //     creator: '张三',
  //     favorites: 120,
  //   },
  //   {
  //     cover: 'https://via.placeholder.com/100',
  //     title: '红烧肉',
  //     creator: '李四',
  //     favorites: 98,
  //   },
  //   {
  //     cover: 'https://via.placeholder.com/100',
  //     title: '麻辣火锅',
  //     creator: '王五',
  //     favorites: 76,
  //   },
  // ]);
  
  const ratingRankings = ref([
    {
      cover: 'https://via.placeholder.com/100',
      title: '宫保鸡丁',
      creator: '赵六',
      rating: 4.8,
    },
    {
      cover: 'https://via.placeholder.com/100',
      title: '清蒸鱼',
      creator: '孙七',
      rating: 4.7,
    },
    {
      cover: 'https://via.placeholder.com/100',
      title: '炸鸡翅',
      creator: '周八',
      rating: 4.6,
    },
  ]);
  
  const followRankings = ref([
    {
      cover: 'https://via.placeholder.com/100',
      title: '糖醋排骨',
      creator: '吴九',
      followers: 300,
    },
    {
      cover: 'https://via.placeholder.com/100',
      title: '红烧茄子',
      creator: '郑十',
      followers: 250,
    },
    {
      cover: 'https://via.placeholder.com/100',
      title: '干锅菜花',
      creator: '王十一',
      followers: 210,
    },
  ]);
  
  // 模拟分类数据
  const cuisineCategories = ref([
    { image: require('@/assets/category/粤菜.png'), name: '粤菜', value: 1 },
    { image: require('@/assets/category/川菜.png'), name: '川菜', value: 2},
    { image: require('@/assets/category/湘菜.png'), name: '湘菜', value: 3},
    { image: require('@/assets/category/鲁菜.png'), name: '鲁菜', value: 4 },
    { image: require('@/assets/category/江浙菜.png'), name: '江浙菜', value: 5 },
    { image: require('@/assets/category/西北菜.png'), name: '西北菜', value: 6 },
    { image: require('@/assets/category/西餐.png'), name: '西式', value: 7 },
    { image: require('@/assets/category/日式.png'), name: '日式', value: 8},
    { image: require('@/assets/category/韩式.png'), name: '韩式', value: 9 },
    { image: require('@/assets/category/东南亚.png'), name: '东南亚', value: 10 }
  ]);
  
  const mealTimeCategories = ref([
    { image: require('@/assets/category/早餐.png'), name: '早餐', value: '11' },
    { image: require('@/assets/category/午餐.png'), name: '午餐', value: '12' },
    { image: require('@/assets/category/小食.png'), name: '小食', value: '13' },
    { image: require('@/assets/category/晚餐.png'), name: '晚餐', value: '14' },
    { image: require('@/assets/category/夜宵.png'), name: '夜宵', value: '15' },
  ]);
  
  const targetAudienceCategories = ref([
    { image: require('@/assets/category/宝宝辅食.png'), name: '婴幼儿', value: '16' },
    { image: require('@/assets/category/健身.png'), name: '健身', value: '17' },
    { image: require('@/assets/category/孕妇.png'), name: '孕妇', value: '18' },
    { image: require('@/assets/category/老人.png'), name: '老人', value: '19' },
    { image: require('@/assets/category/痛经.png'), name: '痛经', value: '20' },
  ]);
  </script>
  
  <style scoped>
  .category-page {
    display: flex;
    flex-direction: column;
  }
  
  .ranking-section {
    background-color: #fdf9f2;
  }
  
  .category-section {
    background-color: #fdfaf4;
    margin: 10px 0;
  }
  

  .ranking-item, .category-item {
    margin-bottom: 20px;
  }
  
  .ranking-header, .category-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .ranking-header h2{
    margin:10px 20px 0;
  }
  
  .ranking-content {
    display: flex;
    align-items: center;
  }
  
  .ranking-content img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .ranking-details {
    display: flex;
    flex-direction: column;
  }
  
  .ranking-details h4 {
    font-size: 16px;
    margin: 0;
  }
  
  .ranking-details p {
    font-size: 14px;
    color: #666;
  }
  
  .category-item {
    display: flex;
    flex-wrap: wrap;
  }
  
  .category-item img {
    width: 50px;
    height: 50px;
    margin: 5px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .category-item p {
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 5px;
  }

  .whitespace{
    height: 30px;
    width: 100%;
  }
  </style>
  