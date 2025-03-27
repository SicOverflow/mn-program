<template>
  <view class="profile-icon" :class="{ active }">
    <image 
      :src="active ? '/static/tabbar/profile-active.png' : '/static/tabbar/profile.png'"
      mode="aspectFit"
      class="icon"
    />
  </view>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.profile-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    width: 100%;
    height: 100%;
  }
}
</style> 