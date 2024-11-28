<template>
    <div class="create-page">
      <!-- 引用 BackBar 组件 -->
      <BackBar 
        :title="'创作'"
      />
  
      <!-- Slogan -->
      <div class="slogan">
        美味由你开启
      </div>
  
      <!-- 中间选项 -->
      <div class="options">
        <VarButton
          type="primary"
          class="option-button1"
          @click="navigateTo('recipe')"
        >
          菜谱
        </VarButton>
        <VarButton
          type="primary"
          class="option-button2"
          @click="navigateTo('blog')"
        >
          动态
        </VarButton>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import BackBar from "@/components/Common/BackBar.vue";
  
  const router = useRouter();
  
  // 页面跳转逻辑
  function navigateTo(type) {
    if (type === 'recipe') {
      router.push('/create/recipe');
    } else if (type === 'blog') {
      router.push('/create/blog');
    }
  }
  </script>
  
  <style scoped>
  .create-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-align: center;
  }
  
  .slogan {
    font-size: 35px;
    font-weight: bold;
    letter-spacing: 3px;
    margin: 200px 0;
  }
  
  .options {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 70px;
    align-items: center;
  }
  
  .option-button1 {
    width: 140px;
    height: 140px;
    background-color: #147D42;
    font-size: 30px;
    letter-spacing: 5px;
    border-radius: 100%;
  }
  
  .option-button2 {
    width: 140px;
    height: 140px;
    background-color: #FF9041;
    font-size: 30px;
    letter-spacing: 5px;
    border-radius: 100%;
  }
  
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  
  .exit-icon {
    font-size: 24px;
    cursor: pointer;
  }
  </style>
  