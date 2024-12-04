<template>
  <BackBar :title="`${post?.blog.author_nickname} 的动态`" :color="'#fff'" :title-position="'center'" :isRoute="false" />
  <div class="blog-item-page">
    <!-- 返回栏 -->

    <!-- 动态内容 -->
    <div class="post-content" v-if="post">
      <div class="post-header">
        <img :src="post.blog.author_picture" alt="头像" class="avatar" />
        <span class="username">{{ post.blog.author_nickname }}</span>
      </div>

      <p v-if="post.blog.content" class="text">{{ post.content }}</p>

      <!-- 动态图片展示 -->
      <div class="image-container" :class="getImageClass(post.images?.length)">
        <img
          v-for="(image, idx) in post.images"
          :key="idx"
          :src="image"
          alt="动态图片"
          :class="{'large-image': post.images.length === 1, 'grid-image': post.images.length !== 1}"
        />
      </div>
    </div>

    <div class="novel-btn">
      <div class="novel-collect-btn" @click="addCollectFun">
        <thumbs-up :theme="isCollect ? 'filled' :'outline'" size="20" :fill="isCollect ? '#189a7c' : '#333'"/>
        <span :class="{ 'novel-color': isCollect }"></span>
      </div>
      <div class="novel-collect-btn">
        <Comment theme="outline" size="20"/>
        <span>评论</span>
      </div>
    </div>

    <!-- 评论框（默认显示）
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
    </div> -->
    <NovelComment />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // 用来获取路由参数
import { getBlogDetail } from '@/api/blog'; // 假设你的 API 请求函数
import { Comment, ThumbsUp } from "@icon-park/vue-next";
const route = useRoute(); // 获取当前路由对象
const post = ref(null);
// 页面加载时获取博客详情
onMounted(async () => {
  const blog_id = route.params.blog_id;
  const res = await getBlogDetail(blog_id);
  post.value = res.data;
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
  