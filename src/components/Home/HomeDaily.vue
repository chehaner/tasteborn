<template>
  <div class="home-daily">
    <div class="home-daily-title">
      <div>每日更新</div>
      <router-link to="/library">
        <span>更多</span>
      </router-link>
    </div>
    <div class="home-daily-list">
      <div class="home-daily-item">
        <HomeList
          :id="item.recipe_id"
          :img="item.img"
          :name="item.recipe_name"
          :key="item.recipe_id"
          v-for="item in recipeList"
        />
      </div>
      <div class="home-daily-item">
        <HomeList
          :id="item.recipe_id"
          :img="item.img"
          :name="item.recipe_name"
          :key="item.recipe_id"
          v-for="item in recipeList"
        />
      </div>
      <var-loading type="wave" v-if="isLoading" color="#ff3992" />
    </div>
  </div>
</template>

<script setup>
import HomeList from "@/components/Home/HomeList.vue";
import { getrecipe } from "@/api/home";
import { onMounted, ref } from "vue";

const limit = ref(20);
const page = ref(1);
const recipeList = ref([]); // 外部定义的 recipeList，用来存储菜谱数据
const isLoading = ref(true);

onMounted(() => {
  // 初始化每日推荐数据
  getRecipe();
});

// 获取每日推荐数据
async function getRecipe() {
  const res = await getrecipe(); // 获取数据
  if (res) {
    recipeList.value = res; // 将数据赋值给 recipeList
  }
  setTimeout(() => {
    isLoading.value = false; // 数据加载完成，隐藏加载动画
  }, 0);
}
</script>

<style scoped lang="scss">
.home-daily {
  background-color: #fff;
  margin: 10px;
  padding: 10px 15px 15px 15px;
  border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  .home-daily-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    
    div {
      margin: 0;
      font-size: 24px;
      color: #414141;
      font-weight: bolder;
    }
    
    span {
      font-size: 18px;
      color: #B8DEA1;
      font-weight: bolder
    }
  }
  
  .home-daily-list {
    overflow: scroll;
    
    .home-daily-item {
      display: flex;
      padding: 6px 0;
    }
  }
  
  .home-daily-list::-webkit-scrollbar {
    display: none;
  }
  
  /* 隐藏 IE、Edge 和 Firefox 的滚动条 */
  .home-daily-list {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
}
</style>
