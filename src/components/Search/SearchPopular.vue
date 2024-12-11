<template>
  <div class="search-popular">
    <div class="search-popular-title">
      热门搜索
    </div>
    <div class="search-popular-list">
      <div class="search-popular-item" v-for="(item, index) in popularList" :key="index" @click="onSearch(item)">
        <span>{{ index+1 }}</span>
        &nbsp;
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import emitter from "@/utils/emitter";
import {ref} from "vue";

const popularList = ref([
  '开胃下饭的双椒炒牛肉~',
  '咸蛋黄鲜虾豆腐，天冷来一锅',
  '番茄肥牛锅',
  '土豆胡萝卜丝饼',
  '10元吃上饭 洋葱炒鸡腿',
  '宿舍都能做的麻辣拌',
  '糯米戚风小蛋糕',
  '荔浦芋头蒸排骨',
  '挑战365天晚餐不重样',
  '葱油手撕鸡'
])

function onSearch(value) {
  emitter.emit('onSearch', value)
}
</script>

<style scoped lang="scss">
.search-popular {
  padding: 10px 12px;
  .search-popular-title {
    font-size: 22px;
    color: #444;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .search-popular-list {
    display: flex;
    flex-wrap: wrap;
    .search-popular-item {
      width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 10px 5px;
      color: #333;
      span {
        font-size: 20px;
      }
    }
    .search-popular-item:nth-child(-n+3) {
      span:nth-child(1) {
        color: red;
      }
    }
  }
}
</style>
