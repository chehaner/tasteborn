import { createStore } from 'vuex'

export default createStore({
  state: {
    picUrl: "http://localhost:3000",
    plateUrl: "https://images.sanyeex.top/novelPicture/",
    tabBarShow: true,
    searchScroll: 0,
    userId: null,
  },
  getters: {
  },
  mutations: {
    // 修改搜索滚动条位置
    setSearchScroll(state,value) {
      state.searchScroll = value
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
  },
  modules: {
  }
})
