<template>
  <div class="rating">
    <span
      class="star"
      v-for="star in 5"
      :key="star"
      :class="{'active': rating >= star || hoverRating >= star}"
      @mouseover="hoverRating = star"
      @mouseleave="hoverRating = 0"
      @click="setRating(star)"
    >
      ★
    </span>
    <div class="rating-display">{{ rating }} 星</div>
    <var-button size="small" class="equal-btn" @click="submitRating">评分</var-button>
  </div>
  <div class="novel-info">
    <div class="novel-info-content">
      <div class="novel-intro">
        <p>{{ props.intro }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { addRate } from '@/api/novel';
const props = defineProps({
  wordCount: {
    type: String,
    default: ""
  },
  collect: {
    type: String,
    default: ""
  },
  updateTime: {
    type: String,
    default: ""
  },
  recentChapters: {
    type: String,
    default: ""
  },
  classTags: {
    type: Array,
    default: []
  },
  intro: {
    type: String,
    default: []
  },
  recipe_id: {
    type: Number,
    default: 0
  },
  rate: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['onLink'])
import { ref, watch } from 'vue';

const rating = ref(0); // 用户选择的评分
const hoverRating = ref(0); // 鼠标悬停时的评分
watch(() => props.rate, (newRate) => {
  console.log("123")
  rating.value = newRate;
});
// 点击星星时确认评分
const setRating = (star) => {
  rating.value = star;
};

// 提交评分
const submitRating = async () => {
  const user_id = localStorage.getItem('user_id')
  const res = await addRate(user_id, props.recipe_id, rating.value)
};
</script>

<style scoped lang="scss">
.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap:10px;
}

.star {
  font-size: 40px;
  cursor: pointer;
  color: gray;
  transition: color 0.2s;
}

.star.active {
  color: gold;
}

.rating-display {
  margin-left: 10px;
}
.novel-info {
  padding: 30px 25px 10px 25px;
  .novel-info-content {
    .novel-info-basic {
      display: flex;
      align-items: center;
      >div {
        color: #555;
        font-size: 20px;
      }
      em {
        font-style: normal;
        padding: 0 10px;
        transform: translateY(-2px);
      }
    }
    >div {
      padding: 8px 0;
      font-size: 20px;
    }
    .novel-info-recentChapters {
      font-weight: bold;
      font-size: 20px;
      color: #333333;
      span {
        font-weight: normal;
        color: #189a7c;
      }
    }
    .novel-info-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-weight: bold;
      font-size: 20px;
      color: #333333;
      p {
        padding: 5px 10px;
        background-color: #eee;
        color: #666;
        margin: 0 5px 2px 5px;
        font-size: 17px;
        border-radius: 4px;
      }
    }
  }
  .novel-intro {
    padding-top: 5px;
    p {
      font-size: 20px;
      line-height: 1.9;
      color: #333;
      white-space: pre-line;
    }
  }
}
.equal-btn {
    margin-left: 60px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    color: white;
    background-color: #189a7c;
    transition: background-color 0.3s ease;
}
</style>
