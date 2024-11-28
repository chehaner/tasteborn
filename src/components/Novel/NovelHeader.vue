<template>
  <div class="novel-header" v-if="props.picUrl">
    <!-- 封面 -->
    <div class="novel-header-pic">
      <img :src=props.picUrl alt="" >
    </div>
    <!-- 标题 -->
    <div class="novel-header-name">
      {{ props.name }}
    </div>
    <!-- 作者 -->
    <div class="novel-header-author">
      <!-- 作者头像 -->
      <img class="author-avatar" :src="props.avatar" alt="用户头像" />
      <!-- 作者昵称 -->
      <span class="author-nickname">{{ props.author_name }}</span>
      <!-- 关注按钮
      <var-button size="small"
        class="follow-btn"
        :class="{ followed: isFollowed }"
        @click="toggleFollow"
      >
        {{ isFollowed ? "已关注" : "关注" }}
      </var-button> -->
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import { ref } from "vue";
const store = useStore()

const storePicUrl = computed(() => store.state.picUrl)

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  picUrl: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  author_name: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
})

// 处理图片链接
function picUrl() {
  return `${storePicUrl.value}${props.id}/${props.picUrl}`
}
const isFollowed = ref(false);
function toggleFollow() {
  isFollowed.value = !isFollowed.value;
}
</script>

<style scoped>
.novel-header {
  display: flex;
  flex-direction: column;
}

.novel-header-pic img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.novel-header-info {
  padding: 10px 15px;
}

.novel-header-name {
  font-size: 30px;
  font-weight: bold;
  color: #333333;
  padding:20px;
}

.novel-header-author {
  display: flex;
  align-items: center;
  gap: 10px; /* 元素间距 */
  padding: 15px;
  font-size: 14px;
}

/* 用户头像 */
.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%; /* 圆形头像 */
  object-fit: cover; /* 保持图片比例 */
  border: 1px solid #ddd;
}

/* 用户昵称 */
.author-nickname {
  flex-grow: 1; /* 占用剩余空间 */
  font-size:20px;
  color: #333;
}

/* 关注按钮 */
.follow-btn {
  font-size: 15px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  background-color: #0a8a6c;
  transition: background-color 0.3s ease;
}

/* 已关注样式 */
.follow-btn.followed {
  background-color: #6c757d; /* 灰色 */
  cursor: default;
}
</style>
