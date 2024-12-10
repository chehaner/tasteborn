import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页-厨因味来'
    },
    component: () => import("@/views/Home/Home.vue")
  },
  {
    path: '/blogs',
    name: "Blogs",
    meta: {
      title: '动态-厨因味来'
    },
    component: () => import("@/views/Blogs/blogs.vue")
  },
  {
    path: '/blogs/item/:blog_id',
    name: "Blogsitem",
    meta: {
      title: '动态内容-厨因味来'
    },
    component: () => import("@/components/Blogs/item.vue")
  },
  {
    path: '/category',
    meta: {
      title: '分类-厨因味来'
    },
    name: 'Category',
    component: () => import("@/views/Category/category.vue"),
  },
  {
    path: '/category/ranking/:title',
    meta: {
      title: '分类-排行榜-厨因味来'
    },
    name: 'CategoryRanking',
    component: () => import("@/views/Category/Ranking/ranking.vue"),
    props:true
  },
  {
    path: '/category/categories/:category',
    meta: {
      title: '分类-类别-厨因味来'
    },
    name: 'Categories',
    component: () => import("@/views/Category/Categories/categories.vue"),
    props:true
  },
  {
    path: '/library',
    meta: {
      title: '分类-厨因味来'
    },
    name: 'Library',
    component: () => import("@/views/Library/Library.vue"),
  },
  {
    path: '/recipes/:id',
    name: 'recipes',
    meta: {
      title: '详情-厨因味来'
    },
    component: () => import("@/views/Novel/Novel.vue")
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      title: '用户中心-厨因味来'
    },
    component: () => import("@/views/User/User.vue"),
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      title: '搜索-厨因味来'
    },
    component: () => import("@/views/Search/Search.vue"),
  },
  {
    path: '/user/personal',
    meta: {
      title: '个人中心-厨因味来'
    },
    name: "Personal",
    component: () => import("@/views/User/Personal/Personal.vue")
  },
  {
    path: '/user/history',
    name: "History",
    meta: {
      title: '我的浏览-厨因味来'
    },
    component: () => import("@/views/User/History/History.vue")
  },
  {
    path: '/user/collect',
    name: "Collect",
    meta: {
      title: '我的收藏-厨因味来'
    },
    component: () => import("@/views/User/Collect/Collect.vue")
  },
  {
    path: '/user/create',
    name: "Creation",
    meta: {
      title: '我的创作-厨因味来'
    },
    component: () => import("@/views/User/Create/Create.vue")
  },
  {
    path: '/create',
    name: "Create",
    meta: {
      title: '创建页-厨因味来'
    },
    component: () => import("@/views/Create/create.vue")
  },
  {
    path: '/create/recipe',
    name: "Recipe",
    meta: {
      title: '创建菜谱-厨因味来'
    },
    component: () => import("@/views/Create/Recipe/recipe.vue")
  },
  {
    path: '/create/blog',
    name: "Blog",
    meta: {
      title: '创建动态-厨因味来'
    },
    component: () => import("@/views/Create/Blog/blog.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async to => {
  const title = to.meta.title
  // 动态修改标题
  if (title) {
    document.title = title
  }
})

export default router
