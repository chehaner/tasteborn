<template>
  <div id="novel">
    <NovelBackBar />
    <NovelHeader
      :name="recipeInfo.recipe_name"
      :pic-url="recipeInfo.img"
      :author_name="recipeInfo.nickname"
      :avatar="recipeInfo.picture"
    />
    <NovelInfo
      :collect="recipeInfo.collect"
      :updateTime="recipeInfo.updateTime"
      :recentChapters="recipeInfo.recentChapters"
      :classTags="recipeInfo.classTags"
      :intro="recipeInfo.content"
      :recipe_id="recipeInfo.recipe_id"
      :rate="recipeInfo.average_rate"
    />
    <!-- <NovelDirectory
      :recent-chapters="recipeInfo.recentChapters"
      :roll-arr="rollArr"
    /> -->
    <RecipeDetail
      :ingredients_count = "recipeInfo.ingredients_count"
      :ingredients="recipeInfo.ingredients"
      :steps_count="recipeInfo.steps_count"
      :steps="recipeInfo.steps"
      :tags="recipeInfo.tags"
      :publish_time="recipeInfo.publish_time"
    />
    <NovelComment
      :recipe_id="recipeInfo.recipe_id"
     />
    <NovelBtn
      :recipe_id="recipeInfo.recipe_id"
      :star="recipeInfo.stars"
      :author_id = "recipeInfo.author_id"
    />
  </div>
</template>

<script setup>
import { getRecipeInfo, getNovelRoll } from "@/api/novel";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Snackbar } from "@varlet/ui"

import NovelBackBar from "@/components/Novel/NovelBackBar.vue";
import NovelHeader from "@/components/Novel/NovelHeader.vue";
import NovelInfo from "@/components/Novel/NovelInfo.vue";
import RecipeDetail from "@/components/Novel/RecipeDetail.vue";
import NovelDirectory from "@/components/Novel/NovelDirectory.vue";
import NovelComment from "@/components/Novel/NovelComment.vue";
import NovelBtn from "@/components/Novel/NovelBtn.vue";

const route = useRoute()

const id = route.params.id
const recipeInfo = ref({})
const rollArr = ref([])

onMounted(() => {
  recipeInfo.value = {}
  rollArr.value = []

  // 初始化菜谱基本信息
  
  initRecipeInfo()
  // initNovelRoll()
})
// 获取菜谱信息
async function initRecipeInfo() {
  const res = await getRecipeInfo(id)
  recipeInfo.value = res.data
}

// // 获取小说卷名
// async function initNovelRoll() {
//   const res = await getNovelRoll(id)
//   if (res.status !== 200) return Snackbar.error(res.message)
//   rollArr.value = res.data.result
// }


// // 点击最新章节跳转
// function newestLink() {
//   setTimeout(() => {
//     window.location.href = `/read/${ rollArr.value.slice(-1)[0].chapter_list.slice(-1)[0].id }`
//   }, 0)
// }
</script>

<style scoped lang="scss">
#novel {
  width: 100%;
  background-color: #fff;
  padding-bottom: 70px;
}
</style>
