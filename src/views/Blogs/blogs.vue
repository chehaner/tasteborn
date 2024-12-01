<template>
  <HomeTabBar />
  <HomeMenuBar />
  <BlogsPage />
  <BottomTab :active="0" />
  </template>
  
  <script name="Blogs" setup>
  import BlogsPage from '@/components/Blogs/BlogsPage.vue';
import HomeMenuBar from '@/components/Home/HomeMenuBar.vue';
  import HomeTabBar from '@/components/Home/HomeTabBar.vue';
  import BottomTab from '@/components/Common/BottomTab.vue';
import { ref } from 'vue';
  
  </script>
  
  <style scoped lang="scss">
  #home {
    margin-bottom: var(--bottom-navigation-height);
    background-color: #f3f3f3;
  }
  </style>
  