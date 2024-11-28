<template>
    <div class="recipe-page">
      <!-- 顶部导航栏 -->
      <BackBar title="菜谱创作" />
  
      <div class="cover-container">
    <!-- 封面图 -->
    <div class="cover-wrapper">
      <img 
        v-if="coverImage" 
        :src="coverImage" 
        alt="封面图" 
        class="cover-image"
      />
      <div v-else class="default-cover">
        上传封面图
      </div>
      <!-- 悬浮更换按钮 -->
      <var-button 
        type="primary"
        class="change-cover-btn"
        @click="selectCover"
      >
        更换封面图
      </var-button>
    </div>
    <!-- 隐藏的文件选择器 -->
    <input 
      type="file" 
      accept="image/*" 
      ref="fileInput" 
      @change="handleFileChange" 
      class="file-input"
    />
  </div>

      <!-- 标题 -->
      <input 
        v-model="recipeTitle" 
        placeholder="添加菜谱标题" 
        class="title-input" 
      />
  
      <!-- 介绍 -->
      <textarea 
        v-model="description" 
        placeholder="介绍一下这道菜吧~" 
        rows="6" 
        class="description-input"
      ></textarea>
  
      <!-- 用料 -->
      <div class="ingredients-section">
        <div class="section-title">用料</div>
        <div class="ingredient-list">
          <div 
            class="ingredient-item" 
            v-for="(ingredient, index) in ingredients" 
            :key="index"
          >
            <input 
              v-model="ingredient.name" 
              placeholder="食材:如鸡蛋" 
              class="ingredient-input"
            />
            <input 
              v-model="ingredient.amount" 
              placeholder="用量:如1只" 
              class="ingredient-input"
            />
            <var-button 
              class="ingbtn"
              text 
              type="danger" 
              @click="removeIngredient(index)"
            >-</var-button>
          </div>
        </div>
      </div>
      <var-button 
          type="primary" 
          text 
          class="addingbtn"
          @click="addIngredient"
        >添加用料</var-button>
  
      <!-- 做法 -->
      <div class="steps-section">
        <div class="section-title">做法</div>
        <div 
          class="step-item" 
          v-for="(step, index) in steps" 
          :key="index"
        >
          <div class="step-title">步骤 {{ index + 1 }}
            <var-button 
              class="stepbtn"
              text 
              type="danger" 
              @click="removeStep(index)"
            >-</var-button>
          </div>
          <textarea 
            v-model="step.description" 
            placeholder="填写步骤内容" 
            rows="3" 
            class="step-input"
          ></textarea>
        </div>
      </div>
      <var-button 
          type="primary" 
          text 
          @click="addStep"
          class="addingbtn"
        >添加步骤</var-button>
  
      <!-- 分类 -->
    <div class="categories-section">
      <div class="section-title">分类</div>
      <var-select
        v-model="selectedCategories"
        :options="categoryOptions"
        multiple
        max="5"
        class="category"
        placeholder="选择分类"
      />
      
    </div>
  
      <!-- 发布按钮 -->
      <var-button 
        type="success" 
        block 
        class="publish-button" 
        @click="handlePublish"
      >
        发布这个菜谱
      </var-button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import BackBar from "@/components/Common/BackBar.vue";
  
  // 路由实例
  const router = useRouter();
  
  // 数据
  const coverImage = ref(''); // 用户选的封面图路径
  const defaultCover = '/path/to/default-cover.jpg'; // 默认占位图路径
  const recipeTitle = ref("");
  const description = ref("");
  const ingredients = ref([{ name: "", amount: "" }]);
  const steps = ref([{ description: "" }]);
  const selectedCategories = ref([]); // 选中的分类列表
  const categoryOptions = ref([ // 分类选项数据
  { label: '主食', value: 'main' },
  { label: '小吃', value: 'snack' },
  { label: '甜点', value: 'dessert' },
  { label: '饮品', value: 'drink' },
  { label: '素食', value: 'vegetarian' },
  { label: '其他', value: 'others' }
]);
  
  // 文件选择器引用
const fileInput = ref(null);

// 打开文件选择器
const selectCover = () => {
  fileInput.value.click();
};

// 处理选中的图片文件
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      coverImage.value = e.target.result; // 更新封面图路径
    };
    reader.readAsDataURL(file); // 将图片文件转换为 Base64
  }
};

  function addIngredient() {
    ingredients.value.push({ name: "", amount: "" });
  }
  
  function removeIngredient(index) {
    ingredients.value.splice(index, 1);
  }
  
  function addStep() {
    steps.value.push({ description: "" });
  }
  
  function removeStep(index) {
    steps.value.splice(index, 1);
  }
  
  // 处理发布逻辑
const handlePublish = () => {
  if (!recipeTitle.value.trim()) {
    alert("标题不能为空！");
    return;
  }
  if (steps.value.some((step) => !step.description.trim())) {
    alert("步骤不能为空！");
    return;
  }


  // 发布成功后跳转
  alert("菜谱发布成功！");
  router.push("/home");
};

  </script>
  
  <style scoped>
  .recipe-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-align: center;
  }
  
  .cover-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

/* 封面图包装器 */
.cover-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 封面图片 */
.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 默认封面图（灰色方框） */
.default-cover {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #aaa;
  font-weight: bold;
}

/* 更换封面按钮 */
.change-cover-btn {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 4px;
}

/* 隐藏文件选择器 */
.file-input {
  display: none;
}
  
  .title-input{
    width: 100%;
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    border: 0px;
    padding: 15px;
  }
  .description-input{
    width: 100%;
    font-size: 20px;
    text-align: left;
    border: 0px;
    padding-left: 15px;
    margin-top: 10px;
  }

.ingredients-section{
    margin: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.ingredient-item{
    width: 100%;
    margin: 5px;
}

  .ingredient-input{
    width: 38%;
    font-size: 20px;
    padding: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 0px;
    border-bottom: 1px dashed #ddd;
  }

  .addingbtn{
    align-items:center;
    margin: 0px;
    width: 100px;
    margin-left: 75%;
    background-color: #B8DEA1;
    color: rgb(53, 52, 52);
    font-weight: bold;
  }

  .ingbtn{
    width: 5%;
    height: 100%;
    background-color: rgb(241, 126, 126);
    color: white;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    border-radius: 100%;
    margin-left: 5%;
  }

  .step-input {
    width: 100%;
    padding: 15px;
    border: 0px;
    border-bottom: 1px dashed #ddd;
    border-radius: 4px;
    font-size: 20px;
  }
  
  .section-title {
    width: 100%;
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    padding: 15px;
    padding-bottom: 0px;
  }
  
  .ingredient-list{
    display: flex;
    flex-direction: column;
    padding: 0px;
  }

  .step-title{
    width: 100%;
    text-align:left;
    font-size: 22px;
    font-weight: bold;
    padding: 15px;
    padding-bottom: 5px;
  }

  .stepbtn{
    width: 5%;
    height: 100%;
    background-color: rgb(241, 126, 126);
    color: white;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    border-radius: 100%;
    margin-left: 74%;
  }

  .step-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .category{
    width: 100%;
    text-align: center;
    padding: 0px;
    padding-left: 15px;
    
  }

  .publish-button {
    height: 80px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    background-color: #FF9041;
  }
  </style>
  