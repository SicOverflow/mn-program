<template>
  <view class="login-form">
    <!-- 返回按钮 -->
    <view class="nav-back" @click="handleBack">
      <text class="back-arrow">←</text>
    </view>

    <!-- 标题 -->
    <view class="title">个人登录</view>

    <!-- 表单区域 -->
    <view class="form-container">
      <!-- 手机号输入 -->
      <view class="form-item">
        <view class="label">手机号</view>
        <input 
          class="input" 
          type="number" 
          placeholder="请输入你的手机号" 
          placeholder-class="placeholder"
          v-model="form.phone"
          maxlength="11"
        />
      </view>

      <!-- 验证码输入 -->
      <view class="form-item">
        <view class="label">验证码</view>
        <view class="code-input">
          <input 
            class="input" 
            type="number" 
            placeholder="请输入验证码" 
            placeholder-class="placeholder"
            v-model="form.code"
            maxlength="6"
          />
          <text 
            class="send-code" 
            :class="{ disabled: counting }"
            @click="handleSendCode"
          >{{ codeText }}</text>
        </view>
      </view>

      <!-- 登录按钮 -->
      <button 
        class="login-btn" 
        :class="{ active: isFormValid }"
        @click="handleSubmit"
      >登录/注册</button>

      <!-- 协议区域 -->
      <view class="agreement">
        <checkbox 
          :checked="form.agreed" 
          @click="form.agreed = !form.agreed"
          color="#4285f4"
        />
        <text class="agreement-text">
          我已阅读并接受
          <text class="link">用户服务协议</text>
          和
          <text class="link">隐私政策</text>
          首次登录将自动注册
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useUserStore } from '../../store/user';
import { ref, computed } from 'vue'

// 获取 user store 实例
const userStore = useUserStore();

const form = ref({
  phone: '',
  code: '',
  agreed: false
})

const counting = ref(false)
const countdown = ref(60)
const codeText = computed(() => counting.value ? `${countdown.value}s后重新发送` : '发送验证码')

const isFormValid = computed(() => {
  return form.value.phone.length === 11 && 
         form.value.code.length === 6 && 
         form.value.agreed
})

const handleBack = () => {
  uni.navigateBack()
}

// 发送验证码
const handleSendCode = async () => {
  if (counting.value) return;
  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    });
    return;
  }

  try {
    const res = await userStore.sendVerificationCode(form.value.phone);
    if (res) {
      counting.value = true;
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
          counting.value = false;
        }
      }, 1000);
      
      uni.showToast({
        title: '验证码已发送',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('发送验证码失败:', error);
  }
};

// 提交表单
const handleSubmit = async () => {
  if (!isFormValid.value) return;
  
  try {
    const res = await userStore.phoneLogin(form.value.phone, form.value.code, form.value.agreed);
    if (res) {
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            uni.navigateBack();
          }, 2000);
        }
      });
    }
  } catch (error) {
    console.error('登录失败:', error);
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  min-height: 100vh;
  background: #fff;
  padding: 0 40rpx;
  padding-top: var(--status-bar-height);

  .nav-back {
    padding: 20rpx 0;
    .back-arrow {
      font-size: 40rpx;
      color: #333;
    }
  }

  .title {
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
    margin: 60rpx 0;
  }

  .form-container {
    .form-item {
      margin-bottom: 40rpx;

      .label {
        font-size: 32rpx;
        color: #333;
        margin-bottom: 20rpx;
      }

      .input {
        width: 100%;
        height: 100rpx;
        background: #f5f7fa;
        border-radius: 16rpx;
        padding: 0 30rpx;
        font-size: 32rpx;
      }

      .code-input {
        display: flex;
        align-items: center;
        background: #f5f7fa;
        border-radius: 16rpx;
        padding-right: 30rpx;

        .input {
          flex: 1;
          background: transparent;
        }

        .send-code {
          font-size: 28rpx;
          color: #4285f4;
          white-space: nowrap;

          &.disabled {
            color: #999;
          }
        }
      }
    }

    .login-btn {
      width: 100%;
      height: 100rpx;
      background: #a4c2f4;
      color: #fff;
      border-radius: 100rpx;
      font-size: 36rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 60rpx 0;

      &.active {
        background: #4285f4;
      }
    }

    .agreement {
      display: flex;
      align-items: flex-start;
      padding: 0 20rpx;

      .agreement-text {
        font-size: 26rpx;
        color: #666;
        margin-left: 10rpx;
        line-height: 1.5;

        .link {
          color: #4285f4;
        }
      }
    }
  }
}

.placeholder {
  color: #999;
  font-size: 32rpx;
}
</style> 