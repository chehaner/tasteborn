<template>
  <div class="library-content-item" @click.stop="onLink">
    <!-- 菜谱图片 -->
    <div class="library-content-img">
      <img v-lazy=props.picUrl class="shadow" alt="">
    </div>
    <div class="library-content-info">
      <!-- 菜谱名 -->
      <div class="library-content-top">
        <div class="library-content-name">
          {{ name }}
        </div>
      </div>
      <!-- 作者+收藏 -->
      <div class="novel-header-author">
        <div>
          <!-- 作者头像 -->
          <img class="author-avatar" :src="props.avatar" alt="用户头像" />
          <!-- 作者昵称 -->
          <span class="author-nickname">{{ props.author }}</span>
        </div>
        <!-- 收藏 -->
        <div class="star-container">
          <Star theme="outline" size="17" class="star-icon" />
          <span class="star-text">{{props.stars}}</span>
        </div>
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
  stars: {
    type: Number,
    default: 0
  },
  picUrl: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  isAnimation: {
    type: Boolean,
    default: false
  },
  intro: {
    type: Array,
    default: []
  },
  author: {
    type: String,
    default: ""
  },
  tags: {
    type: Array,
    default: []
  },
  isSerial: {
    type: Boolean,
    default: false
  },
  isTags: {
    type: Boolean,
    default: false
  }
})

// 搜索区域tags 显示不正常
function tagsSplice(tags) {
  return tags.splice(0, 3)
}

// 跳转路由
function onLink() {
  router.push({
    path: `/recipes/${props.id}`,
  })
}
</script>

<style scoped lang="scss">
.author-avatar {
  width: 40px;
  height: 40px;
  text-align: center;
  align-items: center;
  border-radius: 50%;
  object-fit: cover; /* 确保头像填充区域 */
}
.author-nickname {
  font-size: 18px;
  margin-left:8px;
  color: #555;
  font-weight: 400;
}
.library-content-item {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.library-content-img {
  flex-shrink: 0;
  width: 80px;
  height: 100px;
  margin-right: 16px;
  margin-left:16px;
}

.library-content-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.library-content-info {
  flex-grow: 1;
}

.library-content-top {
  margin-bottom: 8px;
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

.star-container {
  display: flex;
  align-items: center;
}

.star-icon {
  margin-right: 4px;
}

.star-text {
  font-size: 14px;
  color: #666;
}

</style>
