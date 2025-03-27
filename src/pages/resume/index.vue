<template>
  <view class="resume-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="nav-left" @click="handleBack">
        <text class="iconfont">&#xe8b5;</text>
      </view>
      <view class="nav-title">创建简历</view>
      <view class="nav-right">
        <text class="more-icon">•••</text>
      </view>
    </view>

    <!-- 个人信息表单 -->
    <view class="resume-form">
      <view class="form-header">
        <view class="header-title">填写个人信息</view>
        <view class="header-subtitle">填写后，开始求职~</view>
      </view>

      <!-- 头像上传 -->
      <view class="avatar-section">
        <view class="avatar-wrapper" @click="handleUploadAvatar">
          <image v-if="formData.avatar" :src="formData.avatar" class="avatar-image" mode="aspectFill" />
          <view v-else class="avatar-placeholder">
            <view class="camera-icon">
              <text class="iconfont">&#xe8b7;</text>
            </view>
          </view>
        </view>
        <text class="avatar-tip">真实头像更能吸引老板</text>
      </view>

      <!-- 表单项 -->
      <view class="form-group">
        <view class="form-item">
          <text class="label">姓名</text>
          <input 
            type="text" 
            v-model="formData.name" 
            placeholder="请填写真实姓名，2-10个汉字"
            placeholder-class="placeholder"
          />
        </view>

        <view class="form-item">
          <text class="label">性别</text>
          <view class="gender-options">
            <view 
              class="gender-option" 
              :class="{ active: formData.gender === '男' }"
              @click="formData.gender = '男'"
            >男</view>
            <view 
              class="gender-option" 
              :class="{ active: formData.gender === '女' }"
              @click="formData.gender = '女'"
            >女</view>
          </view>
        </view>

        <view class="form-item">
          <text class="label">年龄</text>
          <view class="input-with-arrow" @click="handlePickerTap('birthYear')">
            <text :class="{ placeholder: !formData.birthYear }">{{ formData.birthYear || '请选择出生年份' }}</text>
            <text class="arrow">></text>
          </view>
        </view>

        <view class="form-item">
          <text class="label">学历</text>
          <view class="input-with-arrow" @click="handlePickerTap('education')">
            <text :class="{ placeholder: !formData.education }">{{ formData.education || '请选择最高学历' }}</text>
            <text class="arrow">></text>
          </view>
        </view>

        <view class="form-item">
          <text class="label">工作时间</text>
          <view class="input-with-arrow" @click="handlePickerTap('workExperience')">
            <text :class="{ placeholder: !formData.workExperience }">{{ formData.workExperience || '请选择工作时间' }}</text>
            <text class="arrow">></text>
          </view>
        </view>

        <view class="form-item">
          <text class="label">期望职位</text>
          <view class="input-with-arrow" @click="handlePickerTap('expectedPosition')">
            <text :class="{ placeholder: !formData.expectedPosition }">{{ formData.expectedPosition || '请选择期望职位' }}</text>
            <text class="arrow">></text>
          </view>
        </view>

        <view class="form-item">
          <text class="label">期望薪资</text>
          <view class="input-with-arrow" @click="handlePickerTap('expectedSalary')">
            <text :class="{ placeholder: !formData.expectedSalary }">{{ formData.expectedSalary || '请选择最高薪资' }}</text>
            <text class="arrow">></text>
          </view>
        </view>

        <view class="form-item">
          <text class="label">求职区域</text>
          <view class="input-with-arrow" @click="handlePickerTap('jobLocation')">
            <text :class="{ placeholder: !formData.jobLocation }">{{ formData.jobLocation || '请选择求职区域' }}</text>
            <text class="arrow">></text>
          </view>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-btn" @click="handleSubmit">
        <text>确认提交</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  avatar: '',
  name: '',
  gender: '',
  birthYear: '',
  education: '',
  workExperience: '',
  expectedPosition: '',
  expectedSalary: '',
  jobLocation: ''
})

const handleBack = () => {
  uni.navigateBack()
}

const handleUploadAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.avatar = res.tempFilePaths[0]
    }
  })
}

const handlePickerTap = (field) => {
  // 这里根据不同字段打开对应的选择器
  console.log('Open picker for:', field)
}

const handleSubmit = () => {
  // 这里添加表单验证和提交逻辑
  console.log('Form data:', formData.value)
}
</script>

<style lang="scss" scoped>
.resume-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF1F0 0%, #FFF 30%);
  padding-bottom: 40rpx;

  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--status-bar-height) 30rpx 20rpx;
    background: transparent;

    .nav-left {
      font-size: 40rpx;
      color: #333;
    }

    .nav-title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
    }

    .nav-right {
      font-size: 40rpx;
      color: #333;
    }
  }

  .resume-form {
    padding: 0 30rpx;

    .form-header {
      margin: 40rpx 0;

      .header-title {
        font-size: 40rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 10rpx;
      }

      .header-subtitle {
        font-size: 28rpx;
        color: #999;
      }
    }

    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 40rpx 0;

      .avatar-wrapper {
        width: 160rpx;
        height: 160rpx;
        border-radius: 80rpx;
        overflow: hidden;
        background: #f5f7fa;
        margin-bottom: 20rpx;

        .avatar-image {
          width: 100%;
          height: 100%;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f7fa;

          .camera-icon {
            font-size: 60rpx;
            color: #999;
          }
        }
      }

      .avatar-tip {
        font-size: 24rpx;
        color: #999;
      }
    }

    .form-group {
      background: #fff;
      border-radius: 20rpx;
      padding: 0 30rpx;
      margin-bottom: 40rpx;

      .form-item {
        display: flex;
        align-items: center;
        padding: 30rpx 0;
        border-bottom: 1px solid #f5f5f5;

        &:last-child {
          border-bottom: none;
        }

        .label {
          width: 160rpx;
          font-size: 28rpx;
          color: #333;
        }

        input {
          flex: 1;
          font-size: 28rpx;
          color: #333;
        }

        .gender-options {
          flex: 1;
          display: flex;
          gap: 20rpx;

          .gender-option {
            padding: 10rpx 40rpx;
            border-radius: 8rpx;
            background: #f5f7fa;
            color: #666;
            font-size: 28rpx;

            &.active {
              background: #FFF1F0;
              color: #FF6B6B;
            }
          }
        }

        .input-with-arrow {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .arrow {
            color: #999;
            font-size: 24rpx;
          }
        }
      }
    }
  }

  .submit-btn {
    margin: 40rpx 30rpx;
    height: 88rpx;
    background: #CCCCCC;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 32rpx;

    &.active {
      background: #4285f4;
    }
  }
}

.placeholder {
  color: #999;
}
</style> 