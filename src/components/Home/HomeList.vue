<template>
  <div class="home-item" @click="onLink">
    <!-- 图 -->
    <div class="home-item-img">
      <img class="shadow" alt="" :src="picUrlSplice()">
    </div>
    <!-- 标题 -->
    <div class="home-item-name">
      {{ name }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const router = useRouter()
const store = useStore()

const storePicUrl = computed(() => store.state.picUrl)

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  img: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  // tags: {
  //   type: Array,
  //   default: []
  // }
})
function picUrlSplice() {
  const url = `${storePicUrl.value}/images/${props.img}`
  return url
}

// 跳转链接
function onLink() {
  setTimeout(() => {
    router.push(`/novel/${props.recipe_id}`)
  }, 0)
}
</script>

<style scoped lang="scss">
.home-item {
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 100%;
  padding: 5px 0;
  margin-right: 20px;
  .home-item-img img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
  }
  .home-item-name {
    font-size: 20px;
    color: #333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: center;
  }
  .home-item-tags {
    display: flex;
    .tags-item {
      font-size: 16px;
      color: #666;
    }
  }
  .tags-item:last-of-type span {
    display: none;
  }
}
</style>
