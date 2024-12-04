<template>
  <div class="personal-avatar-item">
    <div class="personal-avatar-content" v-ripple="{ color: '#aaa' }" @click.stop="show = true">
      <div class="personal-avatar-left">
        <span class="user-picture">头像</span>
      </div>
      <div class="personal-avatar-right">
        <img :src="imgInfo" alt="">
        <right theme="outline" size="0.4rem" fill="#555" strokeLinejoin="bevel" strokeLinecap="square"/>
      </div>
    </div>
    <var-dialog
      title="头像修改"
      v-model:show="show"
      confirm-button-text-color="#189a7c"
      cancel-button-text-color="#189a7c"
      @confirm="onChangeAvatar"
      :close-on-click-overlay="false"
    >
      <div class="personal-dialog">
        <var-uploader
          v-model="files"
          :maxlength="1"
          :maxsize="1024*1024*2"
          @oversize="uploadInfo"
        />
      </div>
    </var-dialog>
    <ResultDialog :show="isResultDialog" description="您的头像已经修改成功了!!"></ResultDialog>
  </div>
</template>

<script setup>
import { Right } from "@icon-park/vue-next";
import { updateAvatar, getUserInfo } from "@/api/user";
import ResultDialog from "@/components/Common/ResultDialog.vue";
import {computed, ref} from "vue";
import {Snackbar} from "@varlet/ui";
import {useStore} from "vuex";
import COS from 'cos-js-sdk-v5';
const props = defineProps({
  username: {
    type: String,
    default: ""
  },
  imgInfo: {
    type: String,
    default: "picture.jpg"
  },
})

const show = ref(false)
const files = ref([])
const isResultDialog = ref(false)
// 确认修改头像
function onChangeAvatar() {
  if (files.value.length === 0) {
    Snackbar.warning('请选择文件上传');
    return;
  }

  // 提取实际的 File 对象
  const file = files.value[0].file;
  const fileName = `avatar/${props.username}`;
  const cos = new COS({
    SecretId: 'AKIDa5OYWLySmutfDf1EWltqqsqhOsBHApHk',
    SecretKey: 'Vnyz0aGrOo8II6nKo7MRQsQqBOZbWK7m'
  });

  cos.putObject({
    Bucket: 'test3-1331403891',
    Region: 'ap-guangzhou',
    Key: fileName,
    Body: file,
    ContentType: file.type,
  }, async (err, data) => {
    if (err) {
      console.error('Upload Error:', err);
      Snackbar.error('上传失败');
    } else if (data.statusCode === 200 && data.Location) {
      const fileUrl = `https://${data.Location}`;
      const user_id = localStorage.getItem('user_id')
      await updateAvatar(user_id, fileUrl);
      Snackbar.success('上传成功');
      window.location.reload();
    }
  });
}


// 上传大小限制
function uploadInfo() {
  Snackbar.warning('请选择图片上传(大小为180 * 180像素，支持JPG、PNG等格式，图片需小于2M)')
}
</script>

<style scoped lang="scss">
.personal-avatar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  :deep(.personal-avatar-right) {
    display: flex;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
    span {
      padding-left: 15px;
    }
    .personal-avatar-info {
      font-size: 20px;
      color: #555;
    }
  }
}
.personal-avatar-item {
  .personal-dialog {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  :deep(.var-uploader) {
    width: unset;
  }
  :deep(.var-form-details) {
    display: none;
  }
  :deep(.var-image) {
    width: 80px;
    height: 80px;
    box-shadow: 0 3px 1px -2px var(--shadow-key-umbra-opacity), 0 2px 2px 0 var(--shadow-key-penumbra-opacity), 0 1px 5px 0 var(--shadow-key-ambient-opacity);
    img {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
