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
      <div class="novel-btn">
        <div class="novel-collect-btn" @click="addCollectFun">
          <thumbs-up :theme="isCollect ? 'filled' :'outline'" size="20" :fill="isCollect ? '#189a7c' : '#333'"/>
          <span :class="{ 'novel-color': isCollect }"></span>
        </div>
        <div class="novel-collect-btn">
          <Comment theme="outline" size="20"/>
          <span>评论</span>
        </div>
        <div 
          v-if="isAuthor" 
          class="novel-collect-btn1" 
          @click="editPost">
          <Edit theme="outline" size="24" />
          <span>编辑</span>
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
      <!-- 发布日期 -->
      <div class="post-date">{{ post.publish_time }}</div>
      <BlogComment 
       :id="post.blog.blog_id"
      />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // 用来获取路由参数
import { getBlogDetail } from '@/api/blog'; // 假设你的 API 请求函数
import { Comment, ThumbsUp, Edit } from "@icon-park/vue-next";
import BackBar from '@/components/Common/BackBar.vue';
import BlogComment from './BlogComment.vue';
const route = useRoute(); // 获取当前路由对象
const router = useRouter();
const user_id = localStorage.getItem('user_id'); // 从 localStorage 获取用户 ID

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


const isAuthor = computed(() => Number(user_id) === Number(post.value?.blog.author_id)); // 判断当前用户是否为动态作者

// 点击编辑按钮
function editPost() {
  if (!post.value) return; // 如果未加载动态数据，则返回
  router.push({
    name: 'Blog', // 确保路由名称对应创建动态页面
    query: { 
      isEdit:'true',
      blogImg:[post.value.imageUrls],
      blogData: JSON.stringify(post.value.blog)
       // 将 blog 数据传递给创建动态页面
    },
  });
}

</script>
  
  <style scoped lang="scss">
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
  