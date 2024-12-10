<template>
  <div class="library-popup">
    <var-popup position="left" v-model:show="isPopup">
      <div class="library-popup-block">
        <div class="library-popup-item" v-for="(item, index) in optionsList" :key = index>
          <h4>{{ item.name }}</h4>
          <div class="library-popup-list">
            <p
              v-for="className in item.list"
              :key = className
              :class="{'options-active': optionsIndex[index].options === className}"
              @click="onChange(className, index)"
            >{{ className }}</p>
          </div>
        </div>
      </div>
      <div class="library-btn">
        <button @click="reset">重置</button>
      </div>
    </var-popup>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import emitter from "@/utils/emitter";

const route = useRoute()
const router = useRouter()

const isPopup = ref(false)
const optionsList = ref([
  {
    name: '餐次',
    list: ['早餐', '中午餐', '下午茶', '晚餐', '夜宵']
  },
  {
    name: '菜系',
    list: ['意大利菜','西餐菜系','日本料理','韩国料理','越南菜','泰国菜','四川菜','广东菜', '鲁菜', '苏菜','湘菜','徽菜','浙菜','闽菜','东北菜','西北菜','上海本帮菜','客菜','清真菜']
  },
  {
    name: '适宜人群',
    list: ['青少年','婴儿', '老人', '糖尿病人', '痛经']
  },
  {
    name: '食材类型',
    list: ['绿叶蔬菜','根茎类','豆类','瓜类','菌菇类','茄果类','猪肉','牛肉','羊肉','鸡肉',
    '鸭肉','鹅肉','兔肉','鱼类','虾类','蟹类','贝类','米饭','面条','馒头','面包','粥类']
  }
])

const optionsIndex = ref([
  {name: 'className', options: '全部'},
  {name: 'isSerial', options: '全部'},
  {name: 'isAnimation', options: '全部'},
  {name: 'classTags', options: '全部'},
])

const query = ref({})

// 接收libraryHeader的筛选按钮事件
emitter.on('popupShow', (show) => {
  isPopup.value = show
})

onMounted(() => {
  const queryInfo = route.query
  // popup状态选项保存
  for (let key in queryInfo) {
    optionsIndex.value.forEach((item, index) => {
      if (key === item.name) {
        if (key === 'isSerial') {
          optionsIndex.value[index].options = parseInt(queryInfo[key]) === 1 ? '连载中' : '已完结'
        } else if (key === 'isAnimation') {
          optionsIndex.value[index].options = parseInt(queryInfo[key]) === 1 ? '已动画化' : '未动画化'
        } else {
          optionsIndex.value[index].options = queryInfo[key]
        }
      }
    })
    query.value[key] = queryInfo[key] // 初始化导航栏上面的默认筛选参数
  }
})

function onChange(name, index) {
  let newName = name
  // 把连载中 或 已完结 改为 0 和 1
  if (newName === '连载中' || newName === '已动画化') {
    newName = 1
  } else if (newName === '已完结' || newName === '未动画化') {
    newName = 0
  }

  // 追加关键词给query
  query.value[optionsIndex.value[index].name] = newName
  if (newName === '全部') {
    for (let key in query.value) {
      delete query.value[optionsIndex.value[index].name]
    }
  }

  router.push({
    path: '/library',
    query: query.value
  })
  optionsIndex.value[index].options = name // 改变选项
  isPopup.value = false
}
// 重置
function reset() {
  optionsIndex.value.forEach(item => {
    item.options = '全部'
  })
  router.push({
    path: '/library',
  })
  query.value = {}
  isPopup.value = false
}
</script>

<style scoped lang="scss">
.library-popup-block {
  padding: 15px 15px 50px 15px;
  width: 450px;
  .library-popup-item {
    >h4 {
      font-weight: 400;
      font-size: 22px;
    }
    .library-popup-list {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0;
      p {
        padding: 10px 20px;
        margin: 2px 0;
        font-size: 20px;
        color: #333;
        border-radius: 4px;
      }
    }
  }
}
.library-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 450px;
  button {
    width: 100%;
    height: 50px;
    font-size: 20px;
    background-color: #189a7c;
    color: #fff;
    border: none;
  }
}
.options-active {
  background-color: #189a7c;
  color: #fff !important;
}
</style>
