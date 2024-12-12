<template>
  <div class="blogs-page">
    <div v-for="(post, index) in posts" :key="index" class="post">
      <!-- 动态顶部 -->
      <div class="post-header">
        <img :src="post.picture" alt="头像" class="avatar" />
        <span class="username">{{ post.nickname }}</span>
      </div>
      <!-- 动态内容 -->
      <div class="post-content" @click="goToItemPage(post)">
        <p v-if="post.content" class="text">{{ post.content }}</p>
        <div class="image-container" :class="getImageClass(post.images.length)">
          <img
            v-for="(image, idx) in post.images"
            :key="idx"
            :src="image"
            alt="动态图片"
            :class="{'large-image': post.images.length === 1, 'grid-image': post.images.length !== 1}"
          />
        </div>
      </div>
      <!-- 引用菜谱部分 -->
      <div v-if="post.refer_id && post.recipeInfo" class="library-content-item" @click="goToRecipePage(post.recipeInfo.recipe_id)">
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
          <!-- 作者+收藏 -->
          <div class="novel-header-author">
            <div>
              <!-- 作者头像 -->
              <img class="author-avatar" :src="post.picture" alt="用户头像" />
              <!-- 作者昵称 -->
              <span class="author-nickname">{{ post.nickname }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 按钮部分 -->
      <div class="novel-btn">
        <div class="novel-btn">
          <div class="novel-collect-btn" @click="addCollectFun(post, index)">
            <thumbs-up :theme="post.isFavorited ? 'filled' : 'outline'" size="20" :fill="post.isFavorited ? '#189a7c' : '#333'"/>
            <span :class="{ 'novel-color': post.isFavorited }">{{ post.likes || 0 }}</span>
          </div>
        </div>
        <div class="novel-collect-btn"  @click="goToItemPage(post)">
          <Comment theme="outline" size="20"/>
          <span>{{ post.comments_count||0 }}</span>
        </div>
      </div>
      
      <!-- 评论框，始终显示 -->
      <!-- <div class="post-comment">
        <img src="user-avatar.jpg" alt="用户头像" class="avatar" />
        <input
          v-model="post.commentText"
          type="text"
          class="comment-input"
          placeholder="听说喜欢评论的人做饭会变好吃~"
        />
        <button @click="submitComment(index)" class="send-button">发送</button>
      </div> -->

      <!-- 发布日期 -->
      <div class="post-date">{{ timeUpdate(post.publish_time) }}</div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getBlog, updateCollect } from '@/api/blog';
import { getRecipeInfo } from '@/api/novel';
import { Comment, ThumbsUp } from "@icon-park/vue-next";

const router = useRouter();
const posts = ref([]);


// 获取菜谱信息并补充到动态中
async function fetchRecipeInfo(post, index) {
  try {
    const res1 = await getRecipeInfo(post.refer_id);
    console.log("getRecipeInfo response:", res1);

    if (res1.success && res1.data) {
      // 使用响应式更新方法
      posts.value[index] = {
        ...posts.value[index],
        recipeInfo: res1.data, // 更新 recipeInfo
      };
      console.log("成功获取并赋值菜谱信息:", posts.value[index]);
    }
    else {
      console.error("Invalid response from getRecipeInfo:", res1);
    }
  } catch (error) {
    console.error('获取菜谱信息出错:', error);
  }
}



onMounted(async () => {
  const user_id = localStorage.getItem('user_id');
  try {
    const res = await getBlog(user_id);
    if (res.status === 200) {
      posts.value = res.data.map(post => ({
        ...post,
        isFavorited: post.isFavorited, // 根据返回数据添加收藏状态
        recipeInfo: null, // 初始化为 null，稍后填充
      }));
      // console.log("11", posts.value)
      // 遍历所有有引用的动态并获取菜谱信息
      posts.value.forEach((post, index) => {
        if (post.refer_id) {
          console.log(post.refer_id)
          fetchRecipeInfo(post, index);
        }
      });
    } else {
      console.error('获取博客失败:', res.message);
    }
  } catch (error) {
    console.error('获取博客出错:', error);
  }
});

async function addCollectFun(post, index) {
  const user_id = localStorage.getItem('user_id');
  const isFavorited = !post.isFavorited; // 切换收藏状态

  try {
    // 调用接口更新收藏状态
    await updateCollect(user_id, post.blog_id, isFavorited ? 1 : 0);

    // 更新 UI 中该博客的收藏状态
    posts.value[index].isFavorited = isFavorited;
    posts.value[index].likes = isFavorited
      ? (posts.value[index].likes || 0) + 1 // 收藏后点赞数加1
      : (posts.value[index].likes || 0) - 1; // 取消收藏后点赞数减1
  } catch (error) {
    console.error('更新收藏状态出错:', error);
  }
}

function goToRecipePage(recipeId) {
  router.push({
    path: `/recipes/${recipeId}`,
  });
}

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
function timeUpdate(publish_time) {
    return moment(publish_time).format('YYYY-MM-DD h:mm:ss')
  }
// 跳转到具体动态页面
function goToItemPage(post) {
  setTimeout(() => {
    router.push({
      path: `/blogs/item/${post.blog_id}`,
    });
  }, 0);
}

</script>

<style scoped lang="scss">
.blogs-page {
  padding: 30px;
  margin-bottom: 20px;
}

.post {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
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
}
.novel-btn .novel-collect-btn {
  gap: 10px;
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

</style>
