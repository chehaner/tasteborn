<template>
  <div id="home">
    <HomeTabBar />
    <HomeMenuBar />
    <HomeDaily />
    <BottomTab :active="0" />
  </div>
</template>

<script name="Home" setup>
import HomeTabBar from "@/components/Home/HomeTabBar.vue";
import HomeDaily from "@/components/Home/HomeDaily.vue";
import BottomTab from "@/components/Common/BottomTab.vue";
import HomeMenuBar from "@/components/Home/HomeMenuBar.vue";
</script>

<style scoped lang="scss">
#home {
  margin-bottom: var(--bottom-navigation-height);
  background-color: #f3f3f3;
}
</style>
