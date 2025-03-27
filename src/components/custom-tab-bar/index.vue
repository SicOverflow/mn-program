<template>
  <view class="custom-tab-bar">
    <view 
      v-for="(item, index) in tabList" 
      :key="index"
      class="tab-item"
      @click="switchTab(item.pagePath)"
    >
      <i :class="[
        'icofont-duotone',
        item.iconClass,
        { active: currentPath === item.pagePath }
      ]"></i>
      <text 
        class="text"
        :class="{ active: currentPath === item.pagePath }"
      >{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentPath = ref('/pages/index/index')

const tabList = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    iconClass: 'icofont-home'
  },
  {
    pagePath: '/pages/message/index',
    text: '消息',
    iconClass: 'icofont-comment'
  },
  {
    pagePath: '/pages/jobs/index',
    text: '商城',
    iconClass: 'icofont-shopping-cart'
  },
  {
    pagePath: '/pages/login/index',
    text: '我的',
    iconClass: 'icofont-contacts'
  }
]

// 切换标签页
const switchTab = (path) => {
  if (currentPath.value !== path) {
    uni.switchTab({
      url: path
    })
  }
}

// 监听页面显示
const handlePageShow = () => {
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    const path = `/${currentPage.route}`
    if (currentPath.value !== path) {
      currentPath.value = path
    }
  }
}

onMounted(() => {
  handlePageShow()
  // 监听页面显示
  uni.$on('tabChange', handlePageShow)
  // 监听页面显示事件
  uni.$on('onShow', handlePageShow)
})

onUnmounted(() => {
  // 移除事件监听
  uni.$off('tabChange', handlePageShow)
  uni.$off('onShow', handlePageShow)
})
</script>

<style>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #ffffff;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 999;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rpx 0;
}

.tab-item i {
  font-size: 48rpx;
  height: 48rpx;
  width: 48rpx;
  display: inline-block;
  text-align: center;
  color: #999999;
  position: relative;
}

.tab-item .text {
  font-size: 24rpx;
  margin-top: 4rpx;
  color: #999999;
}

.tab-item i.active,
.tab-item .text.active {
  color: #4285f4;
}

/* 确保图标的伪元素正确显示 */
.tab-item i:before,
.tab-item i:after {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}

.tab-item i:after {
  opacity: 0.4;
}
</style>