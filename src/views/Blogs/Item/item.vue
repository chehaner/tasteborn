<template>
   <BackBar :title="`${post.username} 的动态`" :color="'#fff'" :title-position="'center'" :isRoute="false" />
  
    <div class="blog-item-page">
      <!-- 返回栏 -->
     
      <!-- 动态内容 -->
      <div class="post-content">
        <div class="post-header">
          <img :src="post.userAvatar" alt="头像" class="avatar" />
          <span class="username">{{ post.username }}</span>
        </div>
  
        <p v-if="post.text" class="text">{{ post.text }}</p>
  
        <!-- 动态图片展示 -->
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
  
      <!-- 点赞和评论 -->
      <div class="post-actions">
        <span @click="likePost" class="action">
          <var-icon name="thumb-up" /> {{ post.likes }}
        </span>
        <span @click="toggleComments" class="action">
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
  
      <!-- 评论框（默认显示） -->
      <div v-show="showComments" class="comments-section">
        <div v-for="(comment, index) in post.commentsList" :key="index" class="comment">
          <img :src="comment.userAvatar" alt="用户头像" class="comment-avatar" />
          <div class="comment-text">{{ comment.text }}</div>
        </div>
  
        <div class="post-comment">
          <img src="user-avatar.jpg" alt="用户头像" class="comment-avatar" />
          <input
            v-model="newComment"
            type="text"
            class="comment-input"
            placeholder="说点什么..."
          />
          <button @click="submitComment" class="send-button">发送</button>
        </div>
      </div>
      <NovelComment /> 
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BackBar from '@/components/Common/BackBar.vue'; // 引入返回栏组件
import NovelComment from '@/components/Novel/NovelComment.vue';

  
  const route = useRoute();
  
  const post = ref({
    userAvatar: 'https://via.placeholder.com/40',
    username: '用户1',
    text: '今天学会了新菜谱，超级好吃！',
    images: ['https://via.placeholder.com/500'],
    likes: 12,
    comments: 3,
    commentsList: [
      { userAvatar: 'https://via.placeholder.com/40', text: '看起来好好吃！' },
      { userAvatar: 'https://via.placeholder.com/40', text: '我要试试这个菜谱！' }
    ],
    date: '2024-11-28',
  });
  
  const showComments = ref(false);
  const newComment = ref('');
  


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
  
  // 切换评论显示
  function toggleComments() {
    showComments.value = !showComments.value;
  }
  
  // 点赞
  function likePost() {
    post.value.likes++;
  }
  
  // 提交评论
  function submitComment() {
    if (newComment.value.trim()) {
      post.value.comments++;
      post.value.commentsList.push({ userAvatar: 'https://via.placeholder.com/40', text: newComment.value });
      newComment.value = ''; // 清空输入框
    }
  }
  
  </script>
  
  <style scoped>
  .blog-item-page {
    padding: 10px;
  }
  
  .post-content {
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
    width: 500px;
    height: auto;
    border-radius: 8px;
  }
  
  .three-images img {
    max-width: 30%;
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
  
  .comments-section {
    margin-top: 20px;
  }
  
  .comment {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .comment-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .comment-text {
    font-size: 14px;
    color: #555;
  }
  
  .post-comment {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .comment-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-left: 10px;
  }
  
  .send-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .send-button:hover {
    background-color: #0056b3;
  }
  </style>
  