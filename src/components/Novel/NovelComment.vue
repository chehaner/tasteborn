<template>
  <div class="novel-comment">
    <div class="novel-comment-box">
      <!-- 评论区标题 -->
      <div class="novel-comment-title">
        <span>这道菜的评论</span>
        <span>共 {{ count }} 条评论</span>
      </div>
      <!-- 输入框 -->
      <div class="novel-comment-content" @click="showPopup(true)">
        <comment theme="outline" size="0.32rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
        <span>听说喜欢评论的人做饭会变好吃！</span>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="novel-comment-list">
      <NovelCommentItem
        :comment_id="item.comment_id"
        :user-id="item.user_id"
        :content="item.content"
        :time="item.publish_time"
        :praise="item.likes"
        :reply-count="item.reply_count"
        :nickname="item.nickname"
        :pic-url="item.picture"
        :is-comment-reply="true"
        v-for="item in commentList"
        :key = "item"
        @onShowReply="onShowReply"
      >
      </NovelCommentItem>
    </div>
    <var-popup position="bottom" v-model:show="isPopup">
      <!-- 底部输入框 -->
      <div class="novel-comment-from">
        <div class="novel-comment-input">
          <textarea
            type="text"
            :placeholder="iptConfig.placeholder"
            v-model="commentValue"
            @input="changeValue"
            :style="{ height: `${inputHeight}px` }"
          >
          </textarea>
        </div>
        <div class="novel-comment-from-btn" @click="sendComment">
          <send theme="outline" size="0.35rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
          <span>{{ iptConfig.btnText }}</span>
        </div>
      </div>
    </var-popup>
    <!-- 回复 -->
    <var-popup position="right" v-model:show="isReply">
      <div class="novel-reply-box">
        <div class="novel-reply-title">
          <var-app-bar
            :title="`共有 ${ replyCount } 条评论`"
            color="#fff"
            elevation="0"
            text-color="#000"
            title-position="center"
            class="user-back"
          >
            <template #left>
              <var-button
                color="transparent"
                text-color="#fff"
                @click="isReply = false"
                round
                text
              >
                <close-small theme="outline" size=".35rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
              </var-button>
            </template>
          </var-app-bar>
        </div>
        <van-empty description="暂无回复" v-if="replyCount === 0" />
        <div class="novel-reply-list" ref="novelReplyList" v-else>
          <NovelCommentItem
            :comment_id="item.reply_id"
            :user-id="item.user_id"
            :content="item.content"
            :time="item.publish_time"
            :praise="item.likes"
            :is-comment-count="false"
            :is-comment-reply="false"
            :nickname="item.nickname"
            :pic-url="item.picture"
            v-for="item in replyList"
            :key = "item"
          >
          </NovelCommentItem>
        </div>
        <div class="novel-comment-content" @click="showPopup(false)">
          <div class="novel-comment-reply">
            <comment theme="outline" size="0.32rem" fill="#000" strokeLinejoin="bevel" strokeLinecap="square"/>
            <span>评论回复</span>
          </div>
        </div>
      </div>
    </var-popup>
  </div>
</template>

<script setup>
import { Comment, Send, CloseSmall } from "@icon-park/vue-next";
import NovelCommentItem from "@/components/Novel/NovelCommentItem.vue";
import { addComment, getComment, getReplyComment, replyComment } from "@/api/novel";
import { onMounted, ref, watch } from "vue";
import { Snackbar } from "@varlet/ui"
const user_id = localStorage.getItem("user_id");
const props = defineProps({
  recipe_id: {
    type: Number,
    default: 0
  },
})

const iptConfig = ref({
  placeholder: '一起来评论吧 ~~',
  btnText: '发表评论'
})
const isPopup = ref(false)// 显示评论输入框
const isReply = ref(false) // 显示回复评论
const commentValue = ref('')// 评论内容
const inputHeight = ref(100)// 评论框高度
const isNull = ref()// 是否存在评论
const commentList = ref([])// 评论数据
const replyList = ref([])// 回复数据
const count = ref(0)// 一个有几条评论
const replyCount = ref(0)// 回复评论数量
const mainCommentId = ref(0)// 主评论id,
const flag = ref(true)
onMounted(() => {
  // 默认清除之前的数据
  commentList.value = []
  count.value = 0
  inputHeight.value = 100
  commentValue.value = ""
})
watch(() => props.recipe_id, () => {
  initComment()
  });
// textarea自适应高度
function changeValue(e) {
  const height = 500
  // 判断是否超出屏幕
  if (e.target.scrollHeight < window.innerHeight - height) {
    inputHeight.value = e.target.scrollHeight
  } else {
    inputHeight.value = window.innerHeight - height
  }

  // 判断是否存在评论内容
  if (commentValue.value.length === 0) {
    inputHeight.value = 100 // 重置评论框高度
  }
}
// 初始化评论
async function initComment() {
  const res = await getComment(props.recipe_id)
  if (res.status !== 200) return Snackbar.warning("请登录")
  if (!res.data.length){
    isNull.value = true
  }else{
    isNull.value = false
    commentList.value = res.data
    count.value = res.data.length
  }
  console.log("isNull.value", isNull.value)
}
// 发表评论
async function sendComment() {
  // 进行回复评论和发表评论
  const res = flag.value ? await addComment(props.recipe_id, user_id, commentValue.value) : await replyComment(mainCommentId.value, user_id, commentValue.value)
  // 判断用户是否登录
  if (res.status === 401) {
    Snackbar.warning('请登录')
    setTimeout(() => {
      window.location.href = '/user'
    }, 500)
    return
  }
  if (res.status !== 200) return
  Snackbar.success(res.message)
  // setTimeout(() => {
  //   window.location.reload()
  // }, 500)
  if(flag.value){
    initComment()
  }
  else{
    if(replyCount!==0){
        onShowReply(mainCommentId.value)
    }
  }
}

// 显示popup
function showPopup(show) {
  if (show) {
    iptConfig.value = {
      placeholder: '听说喜欢评论的人做饭会变好吃！',
      btnText: '发表评论'
    }
  } else {
    iptConfig.value= {
      placeholder: '评论回复',
      btnText: '回复评论'
    }
  }
  isPopup.value = true
  flag.value = show
}

// 接收来自子组件NovelCommentItem 显示回复评论区的请求
async function onShowReply(id, count) {
  if(count!==0){
        const res = await getReplyComment(id)
        if (res.status !== 200 && res.status !== 204) return Snackbar.error(res.message)
        replyList.value = res.data
        replyCount.value = res.data.length
        isReply.value = true
        mainCommentId.value = id
    }else{
        replyCount.value = 0
        isReply.value = true
    }
}
</script>

<style scoped lang="scss">
.novel-comment {
  .novel-comment-box {
    padding: 20px 25px;
    border-bottom: 1px solid #eee;
    .novel-comment-title {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }
    .novel-comment-content {
      display: flex;
      align-items: center;
      border-radius: 50px;
      border: 1px solid #e3e3e3;
      margin-top: 10px;
      padding: 10px 0;
      :deep(.i-icon) {
        padding: 0 10px 0 15px;
      }
      span {
        font-size: 18px;
        padding-right: 15px;
        color: rgb(139, 139, 139);
      }
    }
  }
}
.novel-comment-from {
  width: 100%;
  height: 100%;
  .novel-comment-input {
    background-color: #fff;
    padding: 10px 0;
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      padding: 10px 5px;
      resize: none;
    }
  }
  .novel-comment-from-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    :deep(.i-icon) {
      padding-right: 2px;
    }
    span {
      font-size: 22px;
    }
  }
}
.novel-reply-box {
  background-color: #ffffff;
  //overflow: scroll;
  width: 100vw;
  //height: 100vh;
  .novel-reply-title {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
  }
  .novel-reply-list {
    padding-top: .8rem;
  }
  .novel-comment-content {
    padding: 10px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .novel-comment-reply {
    display: flex;
    align-items: center;
    border-radius: 50px;
    border: 1px solid #eee;
    padding: 10px 0;
    :deep(.i-icon) {
      padding: 0 10px 0 15px;
    }
    span {
      font-size: 18px;
      padding-right: 15px;
    }
  }
}
.novel-comment-list {
  padding-bottom: 20px;
}
:deep(.var-app-bar__toolbar) {
  height: 0.80rem;
}
:deep(.i-icon) {
  display: flex;
  align-items: center;
}

</style>
