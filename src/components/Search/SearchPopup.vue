<template>
  <div class="search-popup">
    <var-app-bar title="搜索结果" color="#fff" elevation="false" text-color="#000" class="search-back">
      <template #left>
        <var-button
          color="transparent"
          text-color="#000"
          round
          text
          @click="onBack"
        >
          <var-icon name="chevron-left" :size="24" />
        </var-button>
      </template>
    </var-app-bar>
    <div class="search-list" ref="searchListElement">
      <!-- <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      </van-list> -->
        <LibraryContentItem
          :key="item.recipe_id"
          :id="item.recipe_id"
          :pic-url="item.img"
          :stars="item.stars"
          :name="item.recipe_name"
          :author="item.nickname"
          :avatar="item.picture"
          :tags="item.classTags"
          @click="onLink(item.recipe_id)"
          v-for="item in searchList"
        >
        </LibraryContentItem>
    </div>
  </div>
</template>

<script setup>

import LibraryContentItem from "@/components/Library/LibraryContentItem.vue";
import { getSearch } from "@/api/search";
import {computed, onActivated, ref, watch} from "vue";
import {Snackbar} from "@varlet/ui";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter()

const props = defineProps({
  iptValue: {
    type: String,
    default: ""
  }
})

const loading = ref(true)
const finished = ref(false)
const searchList = ref([])
const limit = ref(20)
const page = ref(1)

const emit = defineEmits(['hidePopup'])

// 初始化搜索内容
// initSearch()

const store = useStore()

// 获取搜索类别元素
const searchListElement = ref(null)

onActivated(() => {
  // 从小说详情页面返回搜索页面保存滚动条位置
  const searchScroll = computed(() => store.state.searchScroll)
  setTimeout(() => {
    document.querySelector('.search-list').scrollTop = parseInt(searchScroll.value)
  }, 0)
})

// 搜索内容初始化
async function initSearch() {
  // loading.value = true // loading 默认不加载
  finished.value = false // finished 默认显示加载未完成

  const res = await getSearch(props.iptValue)
  // 判断搜索结果是否为空
  if (res.status === 403)  {
    finished.value = true
    // loading.value = true
    return
  }
  if (res.status !== 200) return Snackbar.error(res.message)
  // 处理tag标签
  // const newArr = []
  // res.data.forEach(item => {
  //   item.classTags = item.classTags.splice(0, 4)
  //   newArr.push(item)
  // })
  // 这里赋值
  searchList.value = res.data
  // setTimeout(() => {
  //   loading.value = false
  // }, 1000)
}

// 返回搜索页
function onBack() {
  searchList.value = []
  page.value = 1
  emit('hidePopup')
}

// // 下拉加载
// function onLoad() {
//   page.value++
//   initSearch()
// }

// 跳转页面
function onLink(id) {
  const searchScroll = searchListElement.value.scrollTop
  store.commit('setSearchScroll', searchScroll)
  router.push({
    path: `/recipes/${id}`,
  })
}

watch(() => props.iptValue, () => {
  page.value = 1
  initSearch()
})
</script>

<style scoped lang="scss">
.search-popup {
  .search-back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .search-list {
    width: 100vw;
    height: 100vh;
    overflow: scroll;
  }
}
:deep(.var-app-bar__toolbar) {
  height: 0.80rem;
}
.novel-header-author {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-top: 10px;
}
.novel-header-author > div {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}
/* Author avatar */
.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover; /* 确保头像填充区域 */
  border: 2px solid #ccc; /* 添加头像边框 */
}

/* Author nickname */
.author-nickname {
  font-size: 18px;
  margin-left:8px;
  color: #555;
  font-weight: 400;
}
/* 设置收藏容器的样式 */
.star-container {
  display: flex;
  align-items: center;  /* 垂直居中对齐 */
  margin-right:10px;
}
/* 设置图标颜色为浅灰 */
.star-icon {
  color: #646566;
  margin-right:5px;
}

/* 调整 star 和 span 之间的距离 */
.star-text {
  font-size: 18px;  /* 设置 span 字体为小一些 */
  color:#646566;
}
</style>
