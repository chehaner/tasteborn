<template>
    <div class="blog-page">
      <!-- 顶部导航栏 -->
      <BackBar title="动态发布">
      <template #right>
        <!-- 右上角发布按钮 -->
        <var-button
          type="primary"
          @click="handleSubmit"
          class="publish-button"
        >
          发布
        </var-button>
      </template>
    </BackBar>
  
  
      <!-- 图片选择框 -->
      <div class="image-uploader">
        <div 
          class="upload-box" 
          v-for="(image, index) in images" 
          :key="index"
        >
          <!-- 图片预览 -->
          <img :src="image" alt="Uploaded" class="uploaded-image" />
          <!-- 删除按钮 -->
          <div class="delete-btn" @click="deleteImage(index)">
            -
            <!-- <VarIcon name="close" size="20" color="white" /> -->
          </div>
        </div>

        <!-- 添加图片按钮 -->
      <div 
        class="upload-box upload-add" 
        v-if="images.length < maxImages"
      > 
      +
        <input 
          type="file" 
          class="file-input"
          accept="image/*" 
          multiple 
          @change="handleFileChange"
        />
        <var-icon name="add" size="30" />
      </div>

      </div>
    </div>

    <!-- 文本框 -->
    <textarea 
        v-model="content" 
        class="textarea"
        placeholder="分享你的下厨心得、生活点滴~"
        rows="10"
      ></textarea>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from "vue-router";
  import BackBar from "@/components/Common/BackBar.vue";
  
  const router = useRouter();
  
  // 文本内容
  const content = ref('');
  
  // 上传图片数组
  const images = ref([]);
  
  // 最大图片数量
  const maxImages = 9;

  // 发布逻辑
function handleSubmit() {
  if (!content.value.trim() && images.value.length === 0) {
    alert("请填写内容或选择图片后再发布！");
    return;
  }

  // 模拟提交逻辑
  console.log("发布的内容：", content.value);
  console.log("发布的图片：", images.value);

  // 清空内容和图片
  content.value = "";
  images.value = [];
  alert("发布成功！");
}
  
// 处理图片文件选择
function handleFileChange(event) {
  const files = event.target.files;

  // 遍历选中的文件
  for (let i = 0; i < files.length; i++) {
    if (images.value.length < maxImages) {
      const file = files[i];
      const reader = new FileReader();

      // 读取文件内容并转换为 Base64
      reader.onload = (e) => {
        images.value.push(e.target.result); // 将 Base64 添加到 images 数组
      };

      reader.readAsDataURL(file); // 触发读取
    }
  }

  // 清空 input 的值，避免重复触发同一文件选择
  event.target.value = null;
}

  // 删除图片
  function deleteImage(index) {
    images.value.splice(index, 1); // 从数组中移除对应索引的图片
  }
  </script>
  
  <style scoped>
  .blog-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-align: center;
  }
  
  /* 文本框样式 */
  .textarea {
    width: 95%;
    font-size: 22px;
    margin:10px 15px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    resize: none;
    border: 0px;
    border-bottom: 1px solid #ddd;
  }
  
  /* 图片上传区域 */
  .image-uploader {
    margin-left:20px;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: flex-start;
    width: 100%;
  }
  
  .upload-box {
    width: 105px;
    height: 105px;
    background-color:white;
    color: #B8DEA1;
    font-weight: bold;
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
  }
  
  .upload-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
/* 文件选择输入框 */
.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

  /* 删除按钮 */
  .delete-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 35px;
    font-weight: bold;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .delete-btn var-icon {
    pointer-events: none;
  }
  
  /* 添加按钮样式 */
  .upload-add {
    cursor: pointer;
  }
  
  .upload-add var-icon {
    color: #888;
  }

  /* 发布按钮样式 */
.publish-button {
  border-radius: 8px;
  height: 40px;
  background-color:#147D42;
  font-size: 22px;
  padding: 5px 10px;
  margin-right: 5px;
}
  </style>
  