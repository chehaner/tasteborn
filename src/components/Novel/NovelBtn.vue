<template>
  <div class="novel-btn">
    <div class="novel-collect-btn" @click="addCollectFun">
      <star :theme="isCollect ? 'filled' :'outline'" size="24" :fill="isCollect ? '#189a7c' : '#333'"/>
      <span :class="{ 'novel-color': isCollect }">{{props.star}}</span>
    </div>
    <!-- <div class="novel-star-btn">
      <var-button type="primary" color="#189a7c" @click="onRead">开始阅读</var-button>
    </div> -->
    <div class="novel-collect-btn">
      <Comment theme="outline" size="22"/>
      <span>评论</span>
    </div>
    <div class="novel-collect-btn" @click="navigateToBlogs">
      <Camera theme="outline" size="24"/>
      <span>交作业</span>
    </div>
  </div>
</template>

<script setup>
import { Comment, Star, Camera } from "@icon-park/vue-next";
import { Dialog } from '@varlet/ui'
import { updateCollect, addHistory, cancelCollect, getUserCollect } from "@/api/novel";
import {onMounted, ref, watch} from "vue";
import { Snackbar } from "@varlet/ui";
import {useRouter} from "vue-router";

const props = defineProps({
  recipe_id: {
    type: Number,
    default: 0
  },
  star: {
    type: Number,
    default: 0
  },
})

const isCollect = ref(false)
const isLogin = ref(false)

const router = useRouter()
const user_id = localStorage.getItem('user_id')

watch(() => props.recipe_id, () => {
  const token = localStorage.getItem('token')
  if (token) {
      initCollectCommentData();
    }
});

// 判断用户是否已经收藏
async function initCollectCommentData() {
  const res = await getUserCollect(props.recipe_id, user_id)
  // 判断用户是否登录
  if (res.status === 401) return isLogin.value = false
  if (res.status !== 200 && res.status !== 401 && res.status !== 204) return Snackbar.error(res.message)

  if (res.length !== 0) {
    isCollect.value = res.isFavorited;
  }
  console.log("isCollect", isCollect)
}
// 添加或取消收藏
async function addCollectFun() {
  // 判断是否登录
  // if (!isLogin.value) {
  //   Snackbar.warning('请登录!')
  //   setTimeout(() => {
  //     router.push('/user')
  //   }, 500)
  //   return
  // }

  // 没有收藏
  if (!isCollect.value) {
    // 添加收藏
    await updateCollect(user_id, props.recipe_id, 1)
    isCollect.value = true
  } 
  // 已经收藏了
  else {
    // 取消收藏
    await updateCollect(user_id, props.recipe_id, 0)
    isCollect.value = false
  }
}
const navigateToBlogs = () => {
  const recipe_id = props.recipe_id; 
  router.push({ path: '/create/blog', query: { recipe_id } });
};
// // 弹出框
// async function collectResult(message, fun, flag) {
//   await Dialog({
//     title: '确认',
//     message,
//     confirmButtonTextColor: "#189a7c",
//     cancelButtonTextColor: "#189a7c",
//     closeOnClickOverlay: false,
//     // 按下确认或取消按钮
//     async onBeforeClose(action) {
//       if (action === 'confirm') {
//         const res = await fun(props.id)
//         if (res.status !== 200) return Snackbar.error(res.message)

//         Snackbar.success(res.message)
//         setTimeout(async () => {
//           // 收藏按钮颜色变化
//           isCollect.value = flag
//           // 关闭窗口
//           await Dialog.close()
//         })
//       } else {
//         // 关闭窗口
//         await Dialog.close()
//       }
//     }
//   })
// }
</script>

<style scoped lang="scss">
.novel-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  margin-left: 10px;
  padding: 15px 0px;
  background-color: #fff;
  z-index: 999;
  .novel-collect-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    span {
      font-size: 16px;
    }
  }
}
.novel-btn .novel-collect-btn {
  gap: 10px;
}

.novel-color {
  color: #189a7c;
}
</style>
