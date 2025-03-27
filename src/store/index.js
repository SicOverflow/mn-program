import { createStore } from 'vuex'

const store = createStore({
  state: {
    StoreList: [
      { flag: 1, text: "陶艺与黏土类" },
      { flag: 0, text: "布艺类" },
      { flag: 0, text: "木竹藤艺类" },
      { flag: 0, text: "纸艺类" },
      { flag: 0, text: "其他类" }
    ]
  },
  mutations: {
    setStoreList(state, list) {
      state.StoreList = list;
    },
    toggleStoreListFlag(state, index) {
      state.StoreList[index].flag = state.StoreList[index].flag === 0 ? 1 : 0;
    },
    setAllStoreListFlag(state, value) {
      state.StoreList.forEach(item => item.flag = value);
    }
  },
  actions: {
    // 定义异步操作
  },
  getters: {
    // 定义状态获取方法
  }
})

export default store