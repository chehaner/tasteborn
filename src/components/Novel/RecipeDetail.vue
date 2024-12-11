<template>
    <div class="RecipeInfo">
        <div class="ingredients-header">
            <span>用料</span>
            <!-- <var-button size="small" class="equal-btn">换算</var-button> -->
        </div>
        <!-- 原料表格 -->
        <div class="RecipeIngredient">
            <table class="IngredientTable">
                <tbody>
                    <tr v-for="(ingredient, index) in parsedIngredients" :key="index">
                        <td>{{ ingredient.name }}</td>
                        <td>{{ ingredient.quantity }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 步骤 -->
        <div class="RecipeSteps">
            <div v-for="(step, index) in parsedSteps" :key="index">
                <span class="steps-title">步骤 {{ index + 1 }}/{{ steps_count }}</span>
                <p>{{ step }}</p>
            </div>
        </div>
    </div>
    <div class="search-history-list">
      <span>标签：</span>
      <div class="search-history-item" v-for="item in tags" :key = "item" @click="onSearch(item)">
        {{ item }}
      </div >
    </div>
    <div class="novel-info-updateTime">
        最后更新时间: <span>{{ timeUpdate() }}</span>
    </div>
</template>

<script setup>
import moment from "moment";
import { computed, ref } from 'vue';
const props = defineProps({
    ingredients_count: {
        type: Number,
        default: 0
    },
    ingredients: {
        type: String,
        default: ""
    },
    steps_count: {
        type: Number,
        default: 0
    },
    steps: {
        type: String,
        default: ""
    },
    tags:{
        type:Array,
        default:[],
    },
    publish_time: {
        type: String,
        default: ""
    },
});
// 初始化时间
function timeUpdate() {
  return moment(props.publish_time).format('YYYY-MM-DD h:mm:ss')
}
// 解析原料和用量
const parsedIngredients = computed(() => {
  // 按 ***** 分割每种原料
  const ingredientList = props.ingredients.split("*****").filter(Boolean);

  // 将每种原料进一步按 -- 分割为 [原料, 用量]
  return ingredientList.map(item => {
    const [name, quantity] = item.split("--").map(str => str.trim());
    return { name, quantity };
  });
});
const parsedSteps = computed(() => {
    const stepsList = props.steps.split("*****").filter(Boolean);
    return stepsList
})

</script>
<style lang="scss" scoped>
.RecipeSteps{
    margin-top:30px;
}
/* 单个步骤容器样式 */
.RecipeSteps > div {
  padding: 10px; /* 内边距 */
  background-color: #ffffff; /* 背景颜色 */
  border-radius: 8px; /* 圆角 */
}

/* 步骤标题样式 */
.steps-title {
  display: block; /* 独占一行 */
  font-size: 20px; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  margin-bottom: 8px; /* 与描述的间距 */
  color: #333; /* 标题颜色 */
}

/* 步骤描述文本样式 */
.RecipeSteps p {
  font-size: 20px; /* 字体大小 */
  line-height: 1.6; /* 行高 */
  color: #333; /* 字体颜色 */
}

.ingredients-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    font-size: 14px;
}

.ingredients-header span {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.equal-btn {
    font-size: 15px;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    color: white;
    background-color: #b9b9b9;
    transition: background-color 0.3s ease;
}

/* 容器样式 */
.RecipeInfo {
    padding: 20px;
}

/* 表格整体样式 */
.IngredientTable {
    width: 100%;
    /* 表格宽度 */
    border-collapse: collapse;
    /* 去掉单元格间距 */
    border-radius: 10px;
    /* 表格圆角 */
}

/* 表头样式 */
.IngredientTable thead th {
    font-size: 16px;
    text-align: left;
    padding: 12px;
    background-color: #f5f5f5;
    border-bottom: 2px solid #ddd;
    color: #555;
}

/* 表体单元格样式 */
.IngredientTable tbody td {
    font-size: 20px;
    padding: 12px;
    color: #555;
    text-align: left;
}

.IngredientTable tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
}

.IngredientTable tbody tr:nth-child(even) {
    background-color: #fff;
}

/* 鼠标悬停效果 */
.IngredientTable tbody tr:hover {
    background-color: #f0f0f0;
}
.search-history-list {
    display: flex;
    flex-wrap: wrap;
    .search-history-item {
      padding: 8px 10px;
      font-size: 18px;
      background-color: #eee;
      margin: 8px;
      border-radius: 2px;
    }
  }
</style>
