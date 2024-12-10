<template>
  <div class="novel-comment-item" @click="showReply()">
    <div class="novel-comment-avatar">
      <img :src="picUrl" alt="">
      <div class="novel-comment-name">
        {{ nickname }}
      </div>
    </div>
    <div class="novel-comment-right">
      <div class="novel-comment-content">
        {{ content }}
      </div>
      <div class="novel-comment-time">
        {{ timeUpdate() }}
      </div>
      <!-- 点赞 -->
      <div class="novel-comment-icon">
        <div 
          class="novel-comment-like" 
          :class="{ active: isLiked }" 
          @click="handleLike"
        >
          <thumbs-up 
            :theme="isLiked ? 'filled' : 'outline'"
            size=".3rem" 
            :fill="isLiked ? '#39C5BB' : '#000'" 
            strokeLinejoin="bevel" 
            strokeLinecap="square"
          />
          <span class="comment-count">{{ praise }}</span>
        </div>
      </div>
      <div class="novel-comment-reply" v-ripple="{ color: '#d1d1d1' }" @click="showReply()" v-if="props.replyCount">
        共{{ props.replyCount }}条回复
        <right theme="outline" size=".3rem" fill="#189a7c" />
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { ThumbsUp } from "@icon-park/vue-next";
import { Right } from "@icon-park/vue-next";
import { ref, watch } from 'vue';
import { updateLike } from '@/api/novel'; // 假设接口函数已定义
const emit = defineEmits(['onShowReply'])
const isLiked = ref(false); // 是否已点赞
const props = defineProps({
  comment_id: {
    type: Number,
    default: 0
  },
  userId: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    default: ""
  },
  time: {
    type: String,
    default: ""
  },
  praise: {
    type: Number,
    default: 0
  },
  replyCount: {
    type: Number,
    default: 0
  },
  isCommentCount: {
    type: Boolean,
    default: true
  },
  isCommentReply: {
    type: Boolean,
    default: true
  },
  nickname: {
    type: String,
    default: ""
  },
  picUrl: {
    type: String,
    default: ""
  }
})
const praise = ref(props.praise); // 点赞数
// 点赞逻辑
async function handleLike() {
  if (isLiked.value) {
    // 取消点赞
    const res = props.isCommentReply
      ? await updateLike("comments", props.comment_id, -1)//取消评论点赞
      : await updateLike("replies", props.comment_id, -1);//取消回复点赞

    if (res.status === 200) {
      praise.value--;
      isLiked.value = false;
    } else {
      console.error('取消点赞失败:', res.message);
    }
  } else {
    // 点赞
    const res = props.isCommentReply
      ? await updateLike("comments", props.comment_id, 1)//评论点赞
      : await updateLike("replies", props.comment_id, 1);//回复点赞

    if (res.status === 200) {
      praise.value++;
      isLiked.value = true;
    } else {
      console.error('点赞失败:', res.message);
    }
  }
}
// 初始化时间
function timeUpdate() {
  return moment(props.time).format('YYYY-MM-DD h:mm:ss')
}

function showReply() {
  emit('onShowReply', props.comment_id, props.replyCount)
}
</script>

<style scoped lang="scss">
.novel-comment-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  .novel-comment-avatar {
    width: 100%;
    align-items: center;
    display: flex;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    .novel-comment-name {
      color: #666;
      padding-left: 10px;
      font-size: 16px;
    }
  }
  .novel-comment-right {
    padding-left: 55px;
    .novel-comment-content {
      padding-bottom: 10px;
      font-size: 22px;
      word-wrap:break-word;
    }
    .novel-comment-time {
      font-size: 16px;
      color: #666;
    }
    .novel-comment-icon {
      margin-top: 10px;
      display: flex;
      .novel-comment-like {
        display: flex;
        align-items: center;
        .comment-count {
          font-size: 22px;
          padding-left: 5px;
        }
      }
    }
    .novel-comment-reply {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding: 8px 10px;
      background-color: #f1f1f1;
      margin-top: 5px;
      color: #189a7c;
    }
  }
}
:deep(.i-icon) {
  display: flex;
  align-items: center;
}
</style>
