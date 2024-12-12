<template>
    <div v-if="blogs.length > 0" class="follow-homework">
      <div class="title">
        大家交的作业 ({{ totalamount }})
      </div>
      <div class="blogs-list">
        <div
          class="blog-item"
          v-for="(blog, index) in displayedBlogs"
          :key="index"
        >
          <div class="row">
            <div class="cell author">
              <img :src="blog.avatar" alt="头像" class="avatar" />
              <span class="nickname">{{ blog.nickname }}</span>
            </div>
            <div class="cell likes">
              <button class="like-btn">👍 {{ blog.likes }}</button>
            </div>
          </div>
          <div class="row">
            <div class="cell image">
              <img :src="blog.image" alt="动态图片" class="blog-image" />
            </div>
            <div class="cell content">
              {{ blog.content }}
            </div>
          </div>
        </div>
      </div>
      <button v-if="blogs.length > 2" class="view-all-btn" @click="viewAllBlogs">
        查看全部作业
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from "vue";
//   import { getBlogsRefer } from "@/api/blogs";
  
  // Props 接收 recipe_id 参数
  const props = defineProps({
    recipe_id: {
      type: Number,
      required: true,
    },
  });
  
  // 定义数据
  const blogs = ref([]);
  const totalamount = ref(0);
  const displayedBlogs = ref([]);
  
  // 获取动态数据
  const fetchBlogs = async () => {
    try {
      const res = await getBlogsRefer(props.recipe_id);
      if (res.status === 200) {
        blogs.value = res.data;
        totalamount.value = blogs.value.length;
        displayedBlogs.value = blogs.value.slice(0, 2);
      }
    } catch (error) {
      console.error("获取动态失败", error);
    }
  };
  
  // 跳转查看全部作业
  const viewAllBlogs = () => {
    window.location.href = `/blogs?refer_id=${props.recipe_id}`;
  };
  
  onMounted(() => {
    fetchBlogs();
  });
  </script>
  
  <style scoped>
  .follow-homework {
    margin: 20px 0;
    padding: 10px;
    background: #f9f9f9;
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
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: #fff;
    padding: 10px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
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
    border-radius: 50%;
  }
  .nickname {
    font-size: 14px;
    font-weight: bold;
  }
  .likes {
    text-align: right;
  }
  .like-btn {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
  }
  .image {
    flex: 1;
  }
  .blog-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .content {
    flex: 2;
    font-size: 14px;
    line-height: 1.5;
  }
  .view-all-btn {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  .view-all-btn:hover {
    background: #0056b3;
  }
  </style>
  