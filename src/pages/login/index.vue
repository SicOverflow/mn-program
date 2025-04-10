<template>
  <view class="login-container">
    <!-- 顶部用户信息区域 -->
    <view class="user-info">
      <view class="avatar-wrapper">
        <view class="default-avatar">
          <view class="avatar-circle"></view>
          <view class="avatar-body"></view>
        </view>
      </view>
      <view class="login-text" @click="handleWechatLogin">微信登录</view>
      <view class="sub-text">或</view>
      <view class="login-text" @click="handlePhoneLogin">手机号登录</view>
      <view class="sub-text">可查看更多信息</view>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view class="function-item" @click="handleMenuClick('online-resume')">
        <view class="item-left">
          <text class="item-icon">📄</text>
          <text class="item-text">在线简历</text>
        </view>
        <text class="arrow-right">›</text>
      </view>

      <view class="function-item" @click="handleMenuClick('attachment-resume')">
        <view class="item-left">
          <text class="item-icon">📎</text>
          <text class="item-text">附件简历</text>
        </view>
        <view class="status-right">
          <text class="status-text">未上传</text>
          <text class="arrow-right">›</text>
        </view>
      </view>

      <view class="function-item" @click="handleMenuClick('application-progress')">
        <view class="item-left">
          <text class="item-icon">📊</text>
          <text class="item-text">投递进度</text>
        </view>
        <text class="arrow-right">›</text>
      </view>

      <view class="function-item" @click="handleMenuClick('permission-settings')">
        <view class="item-left">
          <text class="item-icon">🔒</text>
          <text class="item-text">权限设置</text>
        </view>
        <text class="arrow-right">›</text>
      </view>

      <view class="function-item" @click="handleMenuClick('feedback')">
        <view class="item-left">
          <text class="item-icon">📝</text>
          <text class="item-text">意见反馈</text>
        </view>
        <text class="arrow-right">›</text>
      </view>
    </view>
    
    <custom-tab-bar />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user';
import CustomTabBar from '@/components/custom-tab-bar/index.vue'

const userStore = useUserStore();
const isLoggedIn = ref(false);
const userInfo = ref(null);

// 检查登录状态
onMounted(async () => {
  try {
    const info = await userStore.getUserInfo();
    if (info) {
      isLoggedIn.value = true;
      userInfo.value = info;
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
});

// 处理微信登录
const handleWechatLogin = async () => {
  try {
    const [error, loginRes] = await uni.login({
      provider: 'weixin'
    });
    
    if (error) {
      throw new Error('微信登录失败');
    }

    // 获取用户信息
    const [userError, userRes] = await uni.getUserInfo({
      provider: 'weixin'
    });

    if (userError) {
      throw new Error('获取用户信息失败');
    }

    // 调用后端登录接口
    const res = await userStore.wechatLogin(loginRes.code, userRes.userInfo);
    if (res) {
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });
    }
  } catch (error) {
    console.error('微信登录失败:', error);
    uni.showToast({
      title: error.message || '登录失败',
      icon: 'none'
    });
  }
};

// 跳转到手机号登录页面
const handlePhoneLogin = () => {
  uni.navigateTo({
    url: '/pages/login-form/index'
  });
};

// 处理菜单项点击
const handleMenuClick = (type) => {
  if (!isLoggedIn.value && type !== 'phone-login') {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    return;
  }

  switch (type) {
    case 'phone-login':
      handlePhoneLogin();
      break;
    case 'online-resume':
      uni.navigateTo({
        url: '/pages/resume/index'
      });
      break;
    case 'attachment-resume':
      uni.showToast({ title: '暂未开放', icon: 'none' });
      break;
    case 'application-progress':
      uni.showToast({ title: '暂未开放', icon: 'none' });
      break;
    case 'permission-settings':
      uni.showToast({ title: '暂未开放', icon: 'none' });
      break;
    case 'feedback':
      uni.showToast({ title: '暂未开放', icon: 'none' });
      break;
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background-color: #DFDBE5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%239C92AC' fill-opacity='0.16'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  padding-top: var(--status-bar-height);
  padding-bottom: 120rpx;
  
  .user-info {
    margin: 30rpx;
    padding: 40rpx 40rpx 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-radius: 30rpx;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    height: 360rpx;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('/static/images/login-bg.jpg');
      background-size: cover;
      background-position: center 40%;
      opacity: 1;
      z-index: 0;
    }
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 50%;
      background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.95));
      z-index: 0;
    }
    
    .avatar-wrapper {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;
      overflow: hidden;
      border: 4rpx solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
      position: relative;
      z-index: 1;
      
      .default-avatar {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #fff;
        
        .avatar-circle {
          width: 36%;
          height: 36%;
          background-color: #4285f4;
          border-radius: 50%;
          position: absolute;
          top: 20%;
          left: 32%;
        }
        
        .avatar-body {
          width: 60%;
          height: 30%;
          background-color: #4285f4;
          position: absolute;
          bottom: 20%;
          left: 20%;
          border-radius: 100rpx 100rpx 0 0;
        }
      }
    }
    
    .login-text {
      font-size: 36rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 10rpx;
      position: relative;
      z-index: 1;
      text-shadow: 0 2rpx 4rpx rgba(255, 255, 255, 0.8);
    }
    
    .sub-text {
      font-size: 28rpx;
      color: #666;
      position: relative;
      z-index: 1;
      text-shadow: 0 2rpx 4rpx rgba(255, 255, 255, 0.8);
    }
  }

  .function-list {
    margin: 20rpx 30rpx;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 30rpx;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
    overflow: hidden;
    
    .function-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx;
      margin: 0 32rpx;
      border-bottom: 1px solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .item-left {
        display: flex;
        align-items: center;
        
        .item-icon {
          font-size: 40rpx;
          margin-right: 24rpx;
          color: #666;
        }
        
        .item-text {
          font-size: 32rpx;
          color: #333;
        }
      }
      
      .status-right {
        display: flex;
        align-items: center;
        
        .status-text {
          font-size: 28rpx;
          color: #ff6b6b;
          margin-right: 16rpx;
        }
      }
      
      .arrow-right {
        font-size: 36rpx;
        color: #ccc;
      }
    }
  }
}
</style>