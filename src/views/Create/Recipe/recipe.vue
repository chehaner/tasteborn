<template>
    <div class="recipe-page">
      <!-- 顶部导航栏 -->
      <BackBar :title="backBarTitle" />
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
  import { ref, onMounted, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import BackBar from "@/components/Common/BackBar.vue";
  import { addRecipe } from "@/api/create";
  import COS from 'cos-js-sdk-v5';
import { Snackbar } from "@varlet/ui";
import { getRecipeInfo } from "@/api/novel";
  // 路由实例
  const router = useRouter();
  const route = useRoute();

  // 数据
  const coverImage = ref(''); // 用户选的封面图路径
  const defaultCover = '/path/to/default-cover.jpg'; // 默认占位图路径
  const recipeTitle = ref("");
  const description = ref("");
  // const ingredients = ref([{ name: "", amount: "" }]);
  const ingredients = ref([]);
  const steps = ref([]);
  // const steps = ref([{ description: "" }]);
  const selectedCategories = ref([]); // 选中的分类列表
  const coverFile = ref(null);
  const categoryOptions = ref([ // 分类选项数据
  //菜系
  { label: '粤菜', value: '1' },
  { label: '川菜', value: '2' },
  { label: '湘菜', value: '3' },
  { label: '鲁菜', value: '4' },
  { label: '江浙菜', value: '5' },
  { label: '西北菜', value: '6' },
  { label: '西式', value: '7' },
  { label: '日式', value: '8' },
  { label: '韩式', value: '9' },
  { label: '东南亚式', value: '10' },
  //餐次
  { label: '早餐', value: '11' },
  { label: '午餐', value: '12' },
  { label: '小食', value: '13' },
  { label: '晚餐', value: '14' },
  { label: '夜宵', value: '15' },
  //人群
  { label: '婴幼儿', value: '16' },
  { label: '青少年', value: '17' },
  { label: '孕妇', value: '18' },
  { label: '老人', value: '19' },
  { label: '痛经', value: '20' },
]);

const backBarTitle = computed(()=>{
  return route.query.isEdit === 'true' ? '菜谱编辑' : '菜谱创作';
})

  // 文件选择器引用
const fileInput = ref(null);

// 打开文件选择器
const selectCover = () => {
  fileInput.value.click();
};

// 处理选中的图片文件
const handleFileChange = (event) => {
  // console.log("在处理")
  const file = event.target.files[0];
  if(file){
    coverFile.value = file; // 保存文件而不是上传
    coverImage.value = URL.createObjectURL(file); // 预览图像
  }
};

const recipeInfo = ref({})
// 获取菜谱信息
async function initRecipeInfo(id) {
  const res = await getRecipeInfo(id)
  recipeInfo.value = res.data
}



onMounted(async () => {
  const recipe_id = route.query.recipe_id; // 获取 query 中的 recipe_id
  const isEdit = route.query.isEdit === "true"; // 判断是否是编辑模式

  if (isEdit && recipe_id) {
    try {
      // 等待 initRecipeInfo 完成
      await initRecipeInfo(recipe_id);

      // 确保 recipeInfo.value 已被正确赋值后再初始化页面数据
      if (recipeInfo.value) {
        coverImage.value = recipeInfo.value.img || '';
        recipeTitle.value = recipeInfo.value.recipe_name || '';
        description.value = recipeInfo.value.content || '';

        // 处理用料（ingredients）数据
        ingredients.value = recipeInfo.value.ingredients
          ? recipeInfo.value.ingredients.split('*****').map(item => {
              const [name, amount] = item.split('--');
              return { name: name || '', amount: amount || '' };
            })
          : [{ name: '', amount: '' }];

        // 处理步骤（steps）数据
        steps.value = recipeInfo.value.steps
          ? recipeInfo.value.steps.split('*****').map(step => ({ description: step || '' }))
          : [{ description: '' }];

        // 初始化分类选项
        selectedCategories.value = recipeInfo.value.tags
        .map(tag => {
          const option = categoryOptions.value.find(option => option.label === tag);
          return option ? option.value : null;
        })
        .filter(value => value !== null);

        // 提交时转换回标签
        function getSelectedTags() {
          return selectedCategories.value.map(value => {
            const option = categoryOptions.value.find(option => option.value === value);
            return option ? option.label : null;
          }).filter(label => label !== null);
        }
      } else {
        console.error("获取菜谱数据失败，recipeInfo.value 为空");
        alert("无法加载菜谱数据，请稍后重试！");
      }
    } catch (error) {
      console.error("获取菜谱信息时发生错误:", error);
      alert("加载数据失败，请检查网络连接！");
    }
  } else {
    // 如果是新建菜谱
    coverImage.value = '';
    recipeTitle.value = '';
    description.value = '';
    ingredients.value = [{ name: "", amount: "" }];
    steps.value = [{ description: "" }];
    selectedCategories.value = [];
  }
});



// 用料操作
const addIngredient = () => ingredients.value.push({ name: "", amount: "" });
const removeIngredient = (index) => ingredients.value.splice(index, 1);

// 步骤操作
const addStep = () => steps.value.push({ description: "" });
const removeStep = (index) => steps.value.splice(index, 1);
const handlePublish = async () => {
  if (!recipeTitle.value.trim()) {
    alert("标题不能为空！");
    return;
  }
  if (steps.value.some((step) => !step.description.trim())) {
    alert("步骤不能为空！");
    return;
  }
  // 拼接用料数据
  const ingredients_count = ingredients.value.length;
  const ingredientsData = ingredients.value
    .map((ingredient) => `${ingredient.name}--${ingredient.amount}`)  // 用 `--` 拼接每个 ingredient 的 name 和 amount
    .join("*****");  // 用 `*****` 拼接每个 ingredient

  // 拼接做法数据
  const steps_count = steps.value.length;
  const stepsData = steps.value
  .map((step) => step.description) // 提取 description
  .join("*****");  // 用 '*****' 拼接所有步骤的描述
  // 如果封面图已选择，进行上传
  if (coverFile.value) {
    const fileName = `recipes/${recipeTitle.value}`; // 文件名
    const cos = new COS({
      SecretId: 'AKIDa5OYWLySmutfDf1EWltqqsqhOsBHApHk',   
      SecretKey: 'Vnyz0aGrOo8II6nKo7MRQsQqBOZbWK7m'       
    });
    try {
      await new Promise((resolve, reject) => {
        cos.putObject({
          Bucket: 'test3-1331403891', 
          Region: 'ap-guangzhou',
          Key: fileName, 
          Body: coverFile.value,
          ContentType: coverFile.value.type,
        }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            coverImage.value = `https://${data.Location}`; 
            console.log("上传成功", `https://${data.Location}`)
            resolve();
          }
        });
      });
    } catch (err) {
      console.error('封面图上传失败:', err);
      alert('封面图上传失败');
      return;
    }
  }
  const user_id = localStorage.getItem("user_id");
  const recipe_id = route.query.recipe_id;
  try {
    // 使用 fetch 发送 POST 请求到后端
    const result = await addRecipe(
      coverImage.value,   // 封面图
      recipeTitle.value,  // 标题
      description.value,  // 描述
      ingredientsData,  // 用料
      ingredients_count,
      stepsData,        // 做法
      steps_count,
      selectedCategories.value,
      user_id,
      recipe_id||null
    );
    // 后端返回成功的响应
    if (result.status === 200) {
      Snackbar.success("菜谱发布成功！")
      router.push("/home"); // 发布成功后跳转到主页
    } else {
      Snackbar.success("发布失败，请稍后再试！")
    }
  } catch (error) {
    // 处理错误
    console.error("发布菜谱失败:", error);
    alert("发布失败，请稍后再试！");
  }
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
  