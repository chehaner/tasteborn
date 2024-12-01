<template>
    <!-- 顶部菜单栏 -->
    <div class="menu-bar">
      <router-link to="/category" class="menu-item">分类</router-link>
      <router-link to="/home" class="menu-item" exact>菜谱</router-link>
      <router-link to="/blogs" class="menu-item">动态</router-link>
    </div>
</template>

<style scoped lang="scss">
/* 顶部菜单栏样式 */
.menu-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.menu-item {
  text-decoration: none;
  font-size: 20px;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}


/* 当前激活路由的样式 */
.router-link-active {
  font-weight: bold;
  color: #39C5BB;
  border-bottom: 5px solid #39C5BB;
}
</style>