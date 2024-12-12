<template>
  <!-- 返回栏 -->
  <BackBar :title="`${post?.blog.author_nickname} 的动态`" :color="'#fff'" :title-position="'center'" :isRoute="false" />
    <!-- 动态 -->
    <div class="blogs-page" v-if="post">
      <!-- 动态顶部的头像、用户名 -->
      <div class="post-header">
        <img :src="post.blog.author_picture" alt="头像" class="avatar" />
        <span class="username">{{ post.blog.author_nickname }}</span>
      </div>
      <div class="post-content">
        <p v-if="post.blog.content" class="text">{{ post.blog.content }}</p>
        <!-- 动态图片展示 -->
        <div class="image-container" :class="getImageClass(post.imageUrls?.length)">
          <img
            v-for="(image, idx) in post.imageUrls"
            :key="idx"
            :src="image"
            alt="动态图片"
            :class="{'large-image': post.imageUrls.length === 1, 'grid-image': post.imageUrls.length !== 1}"
          />
        </div>
      </div>

    <div v-if="post.recipeInfo" class="library-content-item" @click="goToRecipePage(post.recipeInfo.recipe_id)">
        <!-- 菜谱图片 -->
        <div class="library-content-img">
          <img :src="post.recipeInfo.img" class="shadow" alt="菜谱图片">
        </div>
        <div class="library-content-info">
          <!-- 菜谱名 -->
          <div class="library-content-top">
            <div class="library-content-name">              
              {{ post.recipeInfo.recipe_name }}
            </div>
          </div>
          <div class="novel-header-author">
            <div>
              <!-- 作者头像 -->
              <img class="author-avatar" :src="post.recipeInfo.picture" alt="用户头像" />
              <!-- 作者昵称 -->
              <span class="author-nickname">{{ post.recipeInfo.nickname }}</span>
            </div>
          </div>
        </div>
      </div>


      <div class="novel-btn">
        <div class="novel-collect-btn" @click="addCollectFun">
          <thumbs-up :theme="isCollect ? 'filled' :'outline'" size="20" :fill="isCollect ? '#189a7c' : '#333'"/>
          <span :class="{ 'novel-color': isCollect }">{{ post.blog.likes }}</span>
        </div>
        <div class="novel-collect-btn">
          <Comment theme="outline" size="20"/>
          <span>{{ count }}</span>
        </div>
        <!-- <div 
          v-if="isAuthor" 
          class="novel-collect-btn1" 
          @click="editPost">
          <Edit theme="outline" size="24" />
          <span>编辑</span>
        </div> -->
        <!-- 编辑按钮 -->
        <div v-if="isAuthor" class="novel-collect-btn">
          <var-menu placement="top" same-width :offset-y="6">
            <div class="novel-collect-btn">
              <Edit theme="outline" size="24" />
              <span>编辑</span>
            </div>
            <template #menu>
              <var-cell ripple @click="editPost" style="color: black;">修改</var-cell>
              <var-cell ripple @click="showDeleteDialog" style="color: black;">删除</var-cell>
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
      <!-- 发布日期 -->
      <div class="post-date">{{ post.publish_time }}</div>
      <BlogComment 
       :id="post.blog.blog_id"
       @updateCount="handleCountUpdate"
      />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // 用来获取路由参数
import { getBlogDetail, updateCollect, deleteBlog } from '@/api/blog'; // 假设你的 API 请求函数
import { Comment, ThumbsUp, Edit } from "@icon-park/vue-next";
import BackBar from '@/components/Common/BackBar.vue';
import BlogComment from './BlogComment.vue';
import { Snackbar } from '@varlet/ui';
import { getRecipeInfo } from '@/api/novel';

const route = useRoute(); // 获取当前路由对象
const router = useRouter();

const post = ref(null);
const count = ref(0)
const isCollect = ref();
const user_id = localStorage.getItem('user_id')
const blog_id = route.params.blog_id;
const showDialog = ref(false);
function handleCountUpdate(newCount) {
  count.value = newCount;  // 更新父组件中的 count
}
async function addCollectFun() {

  if (!isCollect.value) {
    // 添加收藏
    await updateCollect(user_id, blog_id, 1)
    isCollect.value = true
  } 
  // 已经收藏了
  else {
    // 取消收藏
    await updateCollect(user_id, blog_id, 0)
    isCollect.value = false
  }
  window.location.reload()
}

function goToRecipePage(recipeId) {
  router.push({
    path: `/recipes/${recipeId}`,
  });
}

// 页面加载时获取博客详情
onMounted(async () => {
  const user_id = localStorage.getItem('user_id');
  const blog_id = route.params.blog_id;
  const res = await getBlogDetail(blog_id, user_id);
  post.value = res.data;
  console.log("111",post.value);
  isCollect.value = res.data.blog.isFavorited;

// 加载引用菜谱信息
  if (post.value.blog.refer_id) {
    const recipeRes = await getRecipeInfo(post.value.blog.refer_id);
    post.value.recipeInfo = recipeRes.success ? recipeRes.data : null;
  }

});

// 根据图片数量返回相应的类名
function getImageClass(imageCount) {
  if (imageCount === 1) {
    return 'single-image'; // 一张图片
  } else if (imageCount === 4) {
    return 'four-images'; // 四张图片
  } else {
    return 'three-images'; // 其他情况：2张或3张图片
  }
}


const isAuthor = computed(() => Number(user_id) === Number(post.value?.blog.author_id)); // 判断当前用户是否为动态作者
console.log("是作者吗", isAuthor)
// 点击编辑按钮
function editPost() {
  if (!post.value) return; // 如果未加载动态数据，则返回
  router.push({
    name: 'Blog', // 确保路由名称对应创建动态页面
    query: { 
      blog_id: blog_id,
      isEdit:'true',
      blogImg:[post.value.imageUrls],
      blogData: JSON.stringify(post.value.blog)
       // 将 blog 数据传递给创建动态页面
    },
  });
}
const showDeleteDialog = () => {
  showDialog.value = true;
};

const deleteConfirmed = async () => {
  const res = await deleteBlog(blog_id)
  showDialog.value = false;
  if(res.status==200){
    Snackbar.success(res.message)
  }
  router.push('/blogs');
};

const deleteCanceled = () => {
  showDialog.value = false;
  console.log('用户取消删除');
};
</script>
  
  <style scoped lang="scss">
::v-deep .var-cell {
  color: black;
}

.blogs-page {
  padding: 20px;
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
}

.post-content {
  margin-bottom: 10px;
}

.text {
  margin-bottom: 10px;
  font-size: 20px;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.single-image img {
  max-width: 100%;
  width: 500px; /* 单张图片较大 */
  height: auto;
  border-radius: 8px;
}

.three-images img {
  max-width: 30%; /* 宫格布局最多三张 */
  width: 30%;
  height: auto;
  border-radius: 8px;
}

.four-images img {
  max-width: 45%; 
  width: 45%;
  height: auto;
  border-radius: 8px;
}

/* 引用菜谱 */
.library-content-item {
  display: flex;
  padding: 10px;
  border: 1px solid #ddd; /* 设置边框颜色 */
  border-radius: 12px; /* 设置圆角 */
}

.library-content-img {
  width: 100px;
  height: 100px;
  margin-right: 16px;
  border-radius: 10px;
}

.library-content-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.library-content-info {
  flex-grow: 1;
}

.library-content-top {
}

.library-content-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.novel-header-author {
  margin-top:20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.novel-header-author > div {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}

.author-nickname {
  font-size: 18px;
  color: #666;
}

.post-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.action {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.comment-icon {
  width: 20px;
  height: 20px;
  fill: #333;
}

.post-comment {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-left: 10px;
  font-size: 14px;
}

.send-button {
  padding: 8px 16px;
  background-color: #39C5BB;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #2fa19a;
}

.post-date {
  font-size: 14px;
  color: #777;
}

.novel-btn {
  display: flex;
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
  .novel-collect-btn1 {
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

.novel-collect-btn1{
  margin-left: 220px;
}
  </style>
  