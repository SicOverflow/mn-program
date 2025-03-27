<template>
  <view class="tab-icon" :class="{ active: isActive }">
    <view class="icon-wrapper">
      <view v-if="type === 'profile'" class="profile-icon">
        <view class="head"></view>
        <view class="body"></view>
      </view>
      <view v-else class="default-icon"></view>
    </view>
    <view class="icon-text">{{ text }}</view>
    <view v-if="isActive" class="active-dot"></view>
  </view>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default'
  },
  text: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.tab-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 10rpx 0;
  
  .icon-wrapper {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rpx;
    
    .profile-icon {
      width: 100%;
      height: 100%;
      position: relative;
      
      .head {
        width: 36%;
        height: 36%;
        background-color: currentColor;
        border-radius: 50%;
        position: absolute;
        top: 20%;
        left: 32%;
      }
      
      .body {
        width: 60%;
        height: 30%;
        background-color: currentColor;
        position: absolute;
        bottom: 20%;
        left: 20%;
        border-radius: 100rpx 100rpx 0 0;
      }
    }
    
    .default-icon {
      width: 100%;
      height: 100%;
      background-color: currentColor;
    }
  }
  
  .icon-text {
    font-size: 24rpx;
    color: #999;
    line-height: 1;
  }
  
  .active-dot {
    width: 12rpx;
    height: 12rpx;
    background-color: #4285f4;
    border-radius: 50%;
    position: absolute;
    bottom: -4rpx;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &.active {
    color: #4285f4;
    
    .icon-text {
      color: #4285f4;
    }
  }
  
  &:not(.active) {
    color: #999;
  }
}
</style> 