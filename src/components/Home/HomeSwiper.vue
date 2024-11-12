<template>
  <div class="home-swiper">
    <var-swipe class="swipe-example shadow">
      <var-swipe-item v-for="(url, index) in imgUrl" :key="index">
        <img class="swipe-example-image" :src="url" alt="">
      </var-swipe-item>
    </var-swipe>
  </div>
</template>

<script setup>
import {ref} from "vue";

const imgUrl = ref([
  require("@/assets/images/image1.png"),
  require("@/assets/images/image2.png"),
  require("@/assets/images/image3.png"),
  require("@/assets/images/image4.png"),
  require("@/assets/images/image5.png")
])
</script>

<style scoped lang="scss">
.home-swiper {
  padding: 0 15px 15px 15px;
  background-color: #fff;
}
.swipe-example {
  height: 200px;
  border-radius: 10px;
  .swipe-example-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  .swipe-example-indicators {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 4px 0;
    color: #fff;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>
