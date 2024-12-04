<template>
  <div class="blogs-page">
    <div v-for="(post, index) in posts" :key="index" class="post" @click="goToItemPage(post)">
      <!-- 动态顶部 -->
      <div class="post-header">
        <img :src="post.picture" alt="头像" class="avatar" />
        <span class="username">{{ post.nickname }}</span>
      </div>
      <!-- 动态内容 -->
      <div class="post-content">
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

      <div class="novel-btn">
        <div class="novel-collect-btn" @click="addCollectFun">
          <thumbs-up :theme="isCollect ? 'filled' :'outline'" size="20" :fill="isCollect ? '#189a7c' : '#333'"/>
          <span :class="{ 'novel-color': isCollect }">123</span>
        </div>
        <div class="novel-collect-btn">
          <Comment theme="outline" size="20"/>
          <span>评论</span>
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
      <div class="post-date">{{ post.publish_time }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getBlog } from '@/api/blog';
const router = useRouter();
import { Comment, ThumbsUp } from "@icon-park/vue-next";
const posts = ref([]);
onMounted(async () => {
  console.log("onmount")
  const res = await getBlog()
  posts.value = res.data
})
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
</style>
