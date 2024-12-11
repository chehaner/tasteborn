<template>
  <div class="home-item" @click="onLink">
    <!-- 图 -->
    <div class="home-item-img">
      <img class="shadow" alt="" :src=props.img>
    </div>
    <!-- 标题 -->
    <div class="home-item-name">
      {{ name }}
    </div>
    <!-- 作者+收藏 -->
    <div class="novel-header-author">
      <div>
        <!-- 作者头像 -->
        <img class="author-avatar" :src="props.avatar" alt="用户头像" />
        <!-- 作者昵称 -->
        <span class="author-nickname">{{ props.author_name }}</span>
      </div>
      <!-- 收藏 -->
      <div class="star-container">
        <Star theme="outline" size="17" class="star-icon" />
        <span class="star-text">{{props.star||0}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star } from "@icon-park/vue-next";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const router = useRouter()
const store = useStore()

const storePicUrl = computed(() => store.state.picUrl)

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  img: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  author_name: {
    type: String,
    default: "匿名用户"
  },
  star: {
    type: Number,
    default: 0
  },
})
function picUrlSplice() {
  const url = `${storePicUrl.value}/images/${props.img}`
  return url
}
// 跳转链接
function onLink() {
  setTimeout(() => {
    router.push({
      path: `/recipes/${props.id}`,
    });
  }, 0);
}
</script>

<style scoped lang="scss">
.home-item {
  display: flex;
  flex-direction: column;
  width: 100%; 
  padding: 10px; 
  box-sizing: border-box; 
  
  .home-item-img img {
    width: 100%; /* 动态适应父容器宽度 */
    height: 250px; /* 保持宽高比 */
    border-radius: 8px; /* 调整圆角 */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  }

  .home-item-name {
    font-size: 20px; /* 调整字体大小 */
    font-weight: 500;
    color: #333;
    margin-top: 8px; /* 增加图像与文字的间距 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 限制两行显示 */
    overflow: hidden;
    line-height: 1.4; /* 优化文字间距 */
  }
}
  .home-item-tags {
    display: flex;
    .tags-item {
      font-size: 16px;
      color: #666;
    }
  }
  .tags-item:last-of-type span {
    display: none;
  }
  .novel-header-author {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-top: 10px;
}
.novel-header-author > div {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}
/* Author avatar */
.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover; /* 确保头像填充区域 */
  border: 2px solid #ccc; /* 添加头像边框 */
}

/* Author nickname */
.author-nickname {
  font-size: 18px;
  margin-left:8px;
  color: #555;
  font-weight: 400;
}
/* 设置收藏容器的样式 */
.star-container {
  display: flex;
  align-items: center;  /* 垂直居中对齐 */
  margin-right:10px;
}
/* 设置图标颜色为浅灰 */
.star-icon {
  color: #646566;
  margin-right:5px;
}

/* 调整 star 和 span 之间的距离 */
.star-text {
  font-size: 18px;  /* 设置 span 字体为小一些 */
  color:#646566;
}

</style>
