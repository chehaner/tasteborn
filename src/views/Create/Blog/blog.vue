<template>
    <div class="blog-page">
      <!-- 顶部导航栏 -->
      <BackBar :title="backBarTitle">
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
    <!-- 交作业引用菜谱部分 -->
    <div v-if="recipe_id" class="library-content-item">
      <!-- 菜谱图片 -->
      <div class="library-content-img">
        <img v-lazy=recipeInfo.img class="shadow" alt="">
      </div>
      <div class="library-content-info">
        <!-- 菜谱名 -->
        <div class="library-content-top">
          <div class="library-content-name">
            {{ recipeInfo.recipe_name }}
          </div>
        </div>
        <!-- 作者+收藏 -->
        <div class="novel-header-author">
          <div>
            <!-- 作者头像 -->
            <img class="author-avatar" :src="recipeInfo.picture" alt="用户头像" />
            <!-- 作者昵称 -->
            <span class="author-nickname">{{ recipeInfo.nickname }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref, onMounted, comput } from 'vue';
  import { useRouter, useRoute } from "vue-router";
  import BackBar from "@/components/Common/BackBar.vue";
  import COS from 'cos-js-sdk-v5';
  import { addBlog, getHomeWork } from '@/api/create';
  import { Snackbar } from '@varlet/ui';

  const router = useRouter();
  const route = useRoute();
  const recipe_id = route.query.recipe_id;
  const recipeInfo = ref([]);
  const isEdit = route.query.isEdit === "true"; // 判断是否为编辑状态
  const blogImg = isEdit ? route.query.blogImg : null;
  const blogData = isEdit ? JSON.parse(route.query.blogData) : null; // 获取编辑时的动态数据

  const backBarTitle = computed(()=>{
  return route.query.isEdit === 'true' ? '动态编辑' : '动态创作';
})

  // 文本内容
  const content = ref('');
  // 上传图片数组
  const images = ref([]);
  // 最大图片数量
  const maxImages = 9;

    // 初始化数据
    onMounted(async() => {
    if (blogData) {
      content.value = blogData.content || ''; // 回显文本内容
      images.value = blogImg || []; // 回显图片
    }

    if (recipe_id) {
      try {
        const response = await getHomeWork(recipe_id);
        recipeInfo.value = response.data;
      } catch (error) {
        console.error('加载菜谱数据失败:', error);
      }
    }
  });

  function handleFileChange(event) {
    const files = event.target.files;
    Array.from(files).forEach(file => {
      images.value.push(URL.createObjectURL(file));
    });
    event.target.value = null;
  }

  async function handleSubmit() {
    if (!content.value.trim() && images.value.length === 0) {
      Snackbar.warning('请填写内容或选择图片后再发布！');
      return;
    }

    try {
      const user_id = localStorage.getItem('user_id');
      const uploadPromises = images.value.map(async (blobUrl, index) => {
        const file = await fetch(blobUrl)
          .then(res => res.blob())
          .then(blob => new File([blob], `image-${index}.jpg`, { type: blob.type }));
        return uploadImageToCos(file, index);
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const res = await addBlog(user_id, content.value, uploadedImages, recipe_id);

      if (res?.status === 200) {
        Snackbar.success('动态发布成功！');
        router.push('/blogs');
      } else {
        Snackbar.error('发布失败，请重试！');
      }
    } catch (error) {
      console.error('图片上传或发布失败:', error);
      Snackbar.error('操作失败，请稍后再试！');
    }
  }

  function uploadImageToCos(file, index) {
    return new Promise((resolve, reject) => {
      const fileName = `blogs/${Date.now()}-${index}`;
      const cos = new COS({
        SecretId: 'AKIDa5OYWLySmutfDf1EWltqqsqhOsBHApHk',
        SecretKey: 'Vnyz0aGrOo8II6nKo7MRQsQqBOZbWK7m',
      });

      cos.putObject({
        Bucket: 'test3-1331403891',
        Region: 'ap-guangzhou',
        Key: fileName,
        Body: file,
        ContentType: file.type,
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(`https://${data.Location}`);
        }
      });
    });
  }

  function deleteImage(index) {
    images.value.splice(index, 1);
  }

//   onMounted(async () => {
//   if (recipe_id) {
//     try {
//       const response = await getHomeWork(recipe_id);
//       recipeInfo.value = response.data;
//     } catch (error) {
//       console.error('加载菜谱数据失败:', error);
//     }
//   }
// });

// function handleFileChange(event) {
//   const files = event.target.files;
//   Array.from(files).forEach(file => {
//     images.value.push(URL.createObjectURL(file));
//   });
//   event.target.value = null;
// }

// async function handleSubmit() {
//   if (!content.value.trim() && images.value.length === 0) {
//     Snackbar.warning('请填写内容或选择图片后再发布！');
//     return;
//   }

//   try {
//     const user_id = localStorage.getItem('user_id');
//     const uploadPromises = images.value.map(async (blobUrl, index) => {
//       const file = await fetch(blobUrl)
//         .then(res => res.blob())
//         .then(blob => new File([blob], `image-${index}.jpg`, { type: blob.type }));
//       return uploadImageToCos(file, index);
//     });

//     const uploadedImages = await Promise.all(uploadPromises);
//     const res = await addBlog(user_id, content.value, uploadedImages, recipe_id);


//     if (res?.status === 200) {
//       Snackbar.success('动态发布成功！');
//       router.push('/blogs');
//     } else {
//       Snackbar.error('发布失败，请重试！');
//     }
//   } catch (error) {
//     console.error('图片上传或发布失败:', error);
//     Snackbar.error('操作失败，请稍后再试！');
//   }
// }

// function uploadImageToCos(file, index) {
//   return new Promise((resolve, reject) => {
//     const fileName = `blogs/${Date.now()}-${index}`;
//     const cos = new COS({
//       SecretId: 'AKIDa5OYWLySmutfDf1EWltqqsqhOsBHApHk',
//       SecretKey: 'Vnyz0aGrOo8II6nKo7MRQsQqBOZbWK7m',
//     });

//     cos.putObject({
//       Bucket: 'test3-1331403891',
//       Region: 'ap-guangzhou',
//       Key: fileName,
//       Body: file,
//       ContentType: file.type,
//     }, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(`https://${data.Location}`);
//       }
//     });
//   });
// }

// function deleteImage(index) {
//   images.value.splice(index, 1);
// }
//   onMounted(async () => {
//     console.log("recipe_id", recipe_id)
//   if (recipe_id) {
//     try {
//       console.log("recipe_id", recipe_id)
//       // 发起请求，例如调用 API 获取与该 recipe_id 相关的数据
//       const response = await getHomeWork(recipe_id);
//       recipeInfo.value = response.data;  // 假设返回的数据存储在 response.data 中
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });
//   // 选择图片时
//   function handleFileChange(event) {
//     const files = event.target.files;
//     Array.from(files).forEach((file, index) => {
//       images.value.push(URL.createObjectURL(file));  // 预览图片
//     });
//     event.target.value = null;
//   }
  
//   // 点击发布按钮时，上传所有图片
//   async function handleSubmit() {
//     if (!content.value.trim() && images.value.length === 0) {
//       Snackbar.warning("请填写内容或选择图片后再发布！");
//       return;
//     }
  
//     // 上传所有图片
//     try {
//       const user_id = localStorage.getItem('user_id')
//       console.log("images", images.value)
//       const uploadPromises = images.value.map(async (blobUrl, index) => {
//         // 获取实际的文件对象
//         const file = await fetch(blobUrl).then(res => res.blob()).then(blob => new File([blob], `image-${index}.jpg`, { type: blob.type }));
//         // 上传文件
//         return uploadImageToCos(file, index);
//       });
//       const uploadedImages = await Promise.all(uploadPromises);
//       const res = await addBlog(user_id, content.value, uploadedImages, recipe_id);
//       if (res && res.status === 200) {
//         Snackbar.success("动态发布成功！")
//         router.push("/blogs");
//       } else {
//         Snackbar.error("发布失败，请重试！")
//         console.error("发布博客失败:", res);
//       }
//     } catch (error) {
//       console.error("图片上传失败：", error);
//       Snackbar.error("图片上传失败，请稍后再试！");
//     }
    
//   }
  
//   // 上传图片到腾讯云
//   function uploadImageToCos(file, i) {
//     console.log("在处理第", i)
//     return new Promise((resolve, reject) => {
//       const fileName = `blogs/${content.value}/${i}`; // 生成唯一文件名
//       const cos = new COS({
//         SecretId:'AKIDa5OYWLySmutfDf1EWltqqsqhOsBHApHk',
//         SecretKey:'Vnyz0aGrOo8II6nKo7MRQsQqBOZbWK7m'
//       });
  
//       cos.putObject({
//         Bucket: 'test3-1331403891',  // 你的 Bucket 名称
//         Region: 'ap-guangzhou',  // 例如：ap-shanghai
//         Key: fileName,  // 存储文件的路径
//         Body: file,  // 文件内容
//         ContentType: file.type,  // 文件类型
//       }, (err, data) => {
//         if (err) {
//           reject(err);  // 如果上传失败，reject 错误
//         } else {
//           const fileUrl = `https://${data.Location}`;
//           console.log("fileUrl", fileUrl)
//           resolve(fileUrl);  // 如果上传成功，resolve 文件 URL
//         }
//       });
//     });
//   }

//   // 删除图片
//   function deleteImage(index) {
//     images.value.splice(index, 1); // 从数组中移除对应索引的图片
//   }
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
/* 引用菜谱 */
.library-content-item {
  display: flex;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd; /* 设置边框颜色 */
  border-radius: 12px; /* 设置圆角 */
}

.library-content-img {
  width: 80px;
  height: 100px;
  margin-right: 16px;
}

.library-content-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.library-content-info {
  flex-grow: 1;
}

.library-content-top {
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

  </style>
  