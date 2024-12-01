<template>
  <div class="blogs-page">
    <div v-for="(post, index) in posts" :key="index" class="post" @click="goToItemPage(post)">
      <!-- 动态顶部 -->
      <div class="post-header">
        <img :src="post.userAvatar" alt="头像" class="avatar" />
        <span class="username">{{ post.username }}</span>
      </div>

      <!-- 动态内容 -->
      <div class="post-content">
        <p v-if="post.text" class="text">{{ post.text }}</p>
        <div class="image-container" :class="getImageClass(post.images.length)">
          <!-- 根据图片数量渲染 -->
          <img
            v-for="(image, idx) in post.images"
            :key="idx"
            :src="image"
            alt="动态图片"
            :class="{'large-image': post.images.length === 1, 'grid-image': post.images.length !== 1}"
          />
        </div>
      </div>

      <!-- 点赞和评论 -->
      <div class="post-actions">
        <span @click="likePost(index)" class="action">
          <var-icon name="thumb-up" /> {{ post.likes }}
        </span>
        <span class="action">
          <!-- 使用自定义的SVG评论图标 -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="comment-icon"
            width="20"
            height="20"
          >
            <path
              d="M405.97 530.4m-40.81 0a40.81 40.81 0 1 0 81.62 0 40.81 40.81 0 1 0-81.62 0Z"
            ></path>
            <path
              d="M618.04 530.4m-40.81 0a40.81 40.81 0 1 0 81.62 0 40.81 40.81 0 1 0-81.62 0Z"
            ></path>
            <path
              d="M512.01 959.33c-70.48 0-140.41-16.79-202.89-48.62H93.23V669.25c-18.96-50.4-28.56-103.26-28.56-157.26 0-246.66 200.68-447.32 447.34-447.32s447.32 200.66 447.32 447.32-200.66 447.34-447.32 447.34zM166.85 837.09h160.56l8.16 4.39c53.89 28.94 114.89 44.23 176.43 44.23 206.06 0 373.7-167.65 373.7-373.72 0-206.06-167.65-373.7-373.7-373.7-206.07 0-373.72 167.65-373.72 373.7 0 47.09 8.75 93.16 25.99 136.91l2.57 6.51v181.68z"
            ></path>
          </svg>
          {{ post.comments }}
        </span>
      </div>

      <!-- 评论框，始终显示 -->
      <div class="post-comment">
        <img src="user-avatar.jpg" alt="用户头像" class="avatar" />
        <input
          v-model="post.commentText"
          type="text"
          class="comment-input"
          placeholder="听说喜欢评论的人做饭会变好吃~"
        />
        <button @click="submitComment(index)" class="send-button">发送</button>
      </div>

      <!-- 发布日期 -->
      <div class="post-date">{{ post.date }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const posts = ref([
  {
    userAvatar: 'https://via.placeholder.com/40',
    username: '用户1',
    text: '今天学会了新菜谱，超级好吃！',
    images: ['https://via.placeholder.com/500'], // 一张大图片
    likes: 12,
    comments: 3,
    date: '2024-11-28',
    commentText: '',        
  },
  {
    userAvatar: 'https://via.placeholder.com/40',
    username: '用户2',
    text: '无图无真相，但是真的好吃！',
    images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'], // 两张小图片
    likes: 8,
    comments: 1,
    date: '2024-11-27',
    commentText: '',
  },
  {
    userAvatar: 'https://via.placeholder.com/40',
    username: '用户3',
    text: null,
    images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'], // 三张图片
    likes: 20,
    comments: 5,
    date: '2024-11-26',
    commentText: '',
  },
  {
    userAvatar: 'https://via.placeholder.com/40',
    username: '用户4',
    text: null,
    images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300', 'https://via.placeholder.com/300'], // 四张图片
    likes: 5,
    comments: 2,
    date: '2024-11-25',
    commentText: '',
  },
]);

function likePost(index) {
  posts.value[index].likes++;
}

function submitComment(index) {
  if (posts.value[index].commentText.trim()) {
    // 提交评论
    posts.value[index].comments++;
    posts.value[index].commentText = ''; // 清空输入框
  }
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


// 跳转到具体动态页面
function goToItemPage(post) {
  router.push({ name: 'Blogsitem', params: { postId: post.id } });
}

</script>

<style scoped>
.blogs-page {
  padding: 10px;
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
  font-size: 12px;
  color: #777;
}
</style>
