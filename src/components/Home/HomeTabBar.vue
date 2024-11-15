<template>
  <div class="home-tab-bar">
    <div class="home-tab" @click="$router.push('/search')">
      <div class="home-tab-icon">
        <search theme="outline" size="0.27rem" fill="#333" strokeLinejoin="bevel" strokeLinecap="square"/>
      </div>
      <div class="home-tab-name">
        <span>番茄炒鸡蛋</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@icon-park/vue-next";
</script>

<style scoped lang="scss">
.home-tab-bar {
  padding: 15px;
  background-color: rgb(255, 255, 255);
  
  .home-tab {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #f1f1f1;
    border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    .home-tab-icon {
      padding-left:10px;
      padding-top: 4px;
      display: flex;
      align-items: center;
    }
    .home-tab-name {
      margin-left: 10px;
      color: #333;
      transform: translateY(-2px);
      span {
        font-size: 20px;
      }
    }
  }
}
</style>
