<template>
  <div class="category-item">
    <div class="category-header">
      <h3>{{ title }}</h3>
    </div>

    <div class="category-content">
      <div class="category-list">
        <div v-for="(category, index) in categories" :key="index" class="category" @click="goToCategoryPage(category)">
          <img :src="category.image" alt="Category Image" />
          <p>{{ category.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
});

const router = useRouter();

// 跳转到对应类别页面
function goToCategoryPage(category) {
  router.push({ name: 'Categories', params: { category: category.name } });
}
</script>

<style scoped>
.category-item {
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 10px;
  width: 95%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-header h3 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 20px;
}

.category-content {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.category {
  width: 70px;
  text-align: center;
  cursor: pointer;
}

.category img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
}

.category p {
  font-size: 18px;
  color: #666;
}
</style>
