<template>
    <div v-if="props.blogInfo.length > 0" class="follow-homework">
      <div class="title">
        大家交的作业 ({{ props.blogInfo.length }})
      </div>
      <div class="blogs-list">
        <div
          class="blog-item"
          v-for="(blog, index) in props.blogInfo.slice(0, 3)"
          :key="index"
          @click="goToBlog(blog.blog_id)"
        >
          <div class="row">
            <div class="author">
              <img :src="blog.author.picture" alt="头像" class="avatar" />
              <span class="nickname">{{ blog.author.nickname }}</span>
            </div>
            <div class="novel-collect-btn">
              <thumbs-up/>
              <span>{{ blog.likes }}</span>
            </div>
          </div>
          <div class="row">
            <div class="image">
              <img v-if = "blog.images.length" :src="getFirstItem(blog.images)" class="blog-image" />
            </div>
            <div class="content">
              {{ blog.content }}
            </div>
          </div>
        </div>
      </div>
      <button v-if="props.blogInfo.length > 2" class="view-all-btn" @click="goToAllBlogs()">
        ...更多
      </button>
    </div>
  </template>
  
  <script setup>
import { ThumbsUp } from "@icon-park/vue-next";
  import { ref, onMounted, watch } from "vue";
  import { useRouter } from 'vue-router';
  // 初始化收藏数据
  const router = useRouter();
  // Props 接收 recipe_id 参数
  const props = defineProps({
    recipe_id: {
      type: Number,
      required: true,
    },
    blogInfo:{
      type: Array,
    }
  });
  
  // 定义数据
  const getFirstItem = (array) => {
  return array.slice(0, 1);  // 直接返回数组的第一项
};
  // 跳转查看全部作业
  const goToBlog = (blog_id) => {
    setTimeout(() => {
    router.push({
      path: `/blogs/item/${blog_id}`,
    });
  }, 0);
  };
  const goToAllBlogs = () => {
    setTimeout(() => {
    router.push({
      path: `/home/referBlog/${props.recipe_id}`,
    });
  }, 0);
  };
  </script>
  
  <style scoped>
  .follow-homework {
    margin: 20px 0;
    padding: 30px;
    border-radius: 8px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .blogs-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .blog-item {
    padding:15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: #fff;
    padding: 10px;
    border: 1px solid #eaeaea;
    border-radius: 10px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cell {
    flex: 1;
  }
  .author {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  .nickname {
    font-size: 18px;
  }
  .likes {
    text-align: right;
  }
  .like-btn {
    background: none;
    border: none;
    color: #5b5e60;
  }
  .image {
    width: 130px;
    height: 100px;
    margin-right: 20px;
  }
  .blog-image {
    width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  }
  .content {
    flex: 2;
    font-size:18px;
    line-height: 1.5;
  }
  .view-all-btn {
    width: 20%;
    padding: 10px;
    font-size: 16px;
    background: #019c788a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  .view-all-btn:hover {
    background: #019c78;
  }
  </style>
  