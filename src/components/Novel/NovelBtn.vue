<template>
  <div class="novel-btn">
    <!-- 收藏按钮 -->
    <div class="novel-collect-btn" @click="addCollectFun">
      <Star :theme="isCollect ? 'filled' : 'outline'" size="24" :fill="isCollect ? '#189a7c' : '#333'" />
      <span :class="{ 'novel-color': isCollect }">{{ props.star }}</span>
    </div>

    <!-- 评论按钮 -->
    <div class="novel-collect-btn">
      <Comment theme="outline" size="22" />
      <span>{{ count }}</span>
    </div>

    <!-- 交作业按钮 -->
    <div class="novel-collect-btn" @click="navigateToBlogs">
      <Camera theme="outline" size="24" />
      <span>交作业</span>
    </div>

    <!-- 编辑按钮 -->
    <div class="novel-collect-btn" v-if="Number(props.author_id) === Number(user_id)">
      <var-menu placement="top" same-width :offset-y="6">
        <div class="novel-collect-btn">
          <Edit theme="outline" size="24" />
          <span>编辑</span>
        </div>
        <template #menu>
          <var-cell ripple @click="navigateToEditRecipe">修改</var-cell>
          <var-cell ripple @click="showDeleteDialog">删除</var-cell>
        </template>
      </var-menu>
    </div>
     <!-- 删除确认弹窗 -->
     <var-dialog
      v-model:show="showDialog"
      title="确认删除"
      message="删除这个菜谱吗？"
      show-confirm-button
      show-cancel-button
      confirm-button-text="确认"
      cancel-button-text="取消"
      confirm-button-color="#d9534f"
      @confirm="deleteConfirmed"
      @cancel="deleteCanceled"
    />
  </div>
</template>


<script setup>
import { Comment, Star, Camera, Edit } from "@icon-park/vue-next";
import { Dialog } from '@varlet/ui'
import { updateCollect, getUserCollect, deleteRecipe } from "@/api/novel";
import {onMounted, ref, watch} from "vue";
import { Snackbar } from "@varlet/ui";
import {useRouter} from "vue-router";
import { getComment } from "@/api/novel";
const props = defineProps({
  recipe_id: {
    type: Number,
    default: 0
  },
  star: {
    type: Number,
    default: 0
  },
  author_id: {
    type: Number,
    default: 0
  },
  recipeInfo:{
    type: Array
  },
})
const showDialog = ref(false);

const showDeleteDialog = () => {
  showDialog.value = true;
};

const deleteConfirmed = async () => {
  const res = await deleteRecipe(props.recipe_id)
  showDialog.value = false;
  if(res.status==200){
    Snackbar.success(res.message)
  }
  router.push('/home');
};

const deleteCanceled = () => {
  showDialog.value = false;
  console.log('用户取消删除');
};
const emit = defineEmits()
const isCollect = ref(false)
const isLogin = ref(false)
const router = useRouter()
const user_id = localStorage.getItem('user_id')
const count = ref(0)
const showDropdown = ref(false); 
watch(() => props.recipe_id, async () => {
  const token = localStorage.getItem('token')
  if (token) {
      initCollectCommentData();
      const res = await getComment(props.recipe_id)
      const totalReplyCount = res.data.reduce((sum, item) => sum + item.reply_count, 0);
      count.value = res.data.length + totalReplyCount
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
  window.location.reload()
}
const navigateToBlogs = () => {
  const recipe_id = props.recipe_id; 
  router.push({ path: '/create/blog', query: { recipe_id } });
};
// 跳转到编辑菜谱页面
const navigateToEditRecipe = () => {
  router.push({
    path: '/create/recipe',
    query: { recipe_id: props.recipe_id, isEdit:"true"},
    state: { recipeData: props.recipeInfo } // 将菜谱信息通过 state 传递
  });
};
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
