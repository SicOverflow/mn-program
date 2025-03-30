import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStoreListStore = defineStore('storeList', () => {
  const storeList = ref([
    { flag: 1, text: "陶艺与黏土类" },
    { flag: 0, text: "布艺类" },
    { flag: 0, text: "木竹藤艺类" },
    { flag: 0, text: "纸艺类" },
    { flag: 0, text: "其他类" }
  ]);

  const setStoreList = (list) => {
    storeList.value = list;
  };

  const toggleStoreListFlag = (index) => {
    storeList.value[index].flag = storeList.value[index].flag === 0 ? 1 : 0;
  };

  const setAllStoreListFlag = (value) => {
    storeList.value.forEach(item => item.flag = value);
  };

  return {
    storeList,
    setStoreList,
    toggleStoreListFlag,
    setAllStoreListFlag
  };
});