<template>
  <view class="index-container">
    <!-- 搜索栏 -->
    <view class="search-wrapper">
      <view class="search-box">
        <text class="search-icon icofont-duotone icofont-search"></text>
        <input type="text" placeholder="搜索职位或企业信息" class="search-input" />
        <text class="cancel-btn">取消</text>
      </view>
      
      <!-- 筛选条件 -->
      <view class="filter-tabs">
        <view class="filter-item">
          <text>全部行业</text>
          <text class="arrow">▼</text>
        </view>
        <view class="filter-item">
          <text>残疾类别</text>
          <text class="arrow">▼</text>
        </view>
        <view class="filter-item">
          <text>全部地点</text>
          <text class="arrow">▼</text>
        </view>
        <view class="filter-item">
          <text>更多筛选</text>
          <text class="arrow">▼</text>
        </view>
      </view>
    </view>
    
    <!-- 页面标题 -->
    <view class="page-title">
      <text class="title">我要求职</text>
    </view>
    
    <!-- 轮播图 -->
    <view class="banner-wrapper">
      <swiper class="banner" 
        indicator-dots 
        autoplay 
        circular
        :indicator-color="'rgba(255, 255, 255, 0.6)'"
        :indicator-active-color="'#ffffff'"
        interval="7000" 
        duration="500">
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <view class="banner-item">
            <image 
              :src="item.imageUrl" 
              mode="aspectFill" 
              class="banner-image"
              @error="handleImageError"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 功能模块 -->
    <view class="function-modules">
      <view class="function-row">
        <view class="function-item">
          <view class="function-icon icon-blue">
            <text class="icofont-duotone icofont-brainstorming"></text>
          </view>
          <text class="function-text">职业培训</text>
        </view>
        <view class="function-item">
          <view class="function-icon icon-green">
            <text class="icofont-duotone icofont-certificate"></text>
          </view>
          <text class="function-text">每周职推</text>
        </view>
        <view class="function-item">
          <view class="function-icon icon-orange">
            <text class="icofont-duotone icofont-medal"></text>
          </view>
          <text class="function-text">灵活就业</text>
        </view>
        <view class="function-item">
          <view class="function-icon icon-blue">
            <text class="icofont-duotone icofont-university"></text>
          </view>
          <text class="function-text">政策要闻</text>
        </view>
      </view>
      
      <view class="function-row">
        <view class="function-item">
          <view class="function-icon icon-orange">
            <text class="icofont-duotone icofont-read-book-alt"></text>
          </view>
          <text class="function-text">公开课程</text>
        </view>
        <view class="function-item">
          <view class="function-icon icon-yellow">
            <text class="icofont-duotone icofont-teacher"></text>
          </view>
          <text class="function-text">就业典范</text>
        </view>
        <view class="function-item">
          <view class="function-icon icon-green">
            <text class="icofont-duotone icofont-book"></text>
          </view>
          <text class="function-text">专栏文章</text>
        </view>
        <view class="function-item">
          <view class="function-icon icon-yellow">
            <text class="icofont-duotone icofont-school-bus"></text>
          </view>
          <text class="function-text">活动专区</text>
        </view>
      </view>
    </view>
    
    <!-- 职位列表 -->
    <view class="jobs-list">
      <view class="job-item" v-for="(job, index) in jobList" :key="index">
        <view class="job-header">
          <text class="job-title">{{ job.title }}</text>
          <text class="job-tag">{{ job.salary }}</text>
        </view>
        
        <view class="job-info">
          <text class="job-location">{{ job.location }} · {{ job.education }} · {{ job.experience }}</text>
        </view>
        
        <view class="job-tags">
          <text v-for="(tag, tagIndex) in job.tags" 
            :key="tagIndex" 
            class="tag"
            :class="getTagClass(tag)">{{ tag }}</text>
        </view>
        
        <view class="company-info">
          <image class="company-logo" :src="job.companyLogo" mode="aspectFit"></image>
          <view class="company-detail">
            <text class="company-name">{{ job.companyName }}</text>
            <text class="company-type">{{ job.companyType }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <custom-tab-bar />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import CustomTabBar from '@/components/custom-tab-bar/index.vue'

// 轮播图数据
const bannerList = ref([
  { imageUrl: '/static/images/banner/banner-1.png' },
  { imageUrl: '/static/images/banner/banner-2.png' },
  { imageUrl: '/static/images/banner/banner-3.png' },
  { imageUrl: '/static/images/banner/banner-4.png' },
  { imageUrl: '/static/images/banner/banner-5.png' }
])

// 图片加载错误处理
const handleImageError = (e) => {
  console.error('Image load failed:', e)
}

// 职位列表数据
const jobList = ref([])

// 获取标签样式类名
const getTagClass = (tag) => {
  const tagMap = {
    '视力残疾': 'tag-vision',
    '听力残疾': 'tag-hearing',
    '言语残疾': 'tag-speech',
    '肢体残疾': 'tag-physical',
    '智力残疾': 'tag-intelligence',
    '精神残疾': 'tag-mental',
    '多重残疾': 'tag-multiple'
  }
  
  // 遍历tagMap，检查tag是否包含对应的关键字
  for (const [key, value] of Object.entries(tagMap)) {
    if (tag.includes(key)) {
      return value
    }
  }
  
  return 'tag-other'
}
</script>

<style lang="scss" scoped>
.index-container {
  min-height: 100vh;
  background-color: #DFDBE5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%239C92AC' fill-opacity='0.16'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  padding-bottom: 120rpx;
}

.page-title {
  padding: 30rpx 30rpx 10rpx;
  .title {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
  }
}

.search-wrapper {
  padding: 20rpx 30rpx;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 50rpx;
  padding: 15rpx 30rpx;
  margin-bottom: 20rpx;
  
  .search-icon {
    margin-right: 10rpx;
    color: #999;
  }
  
  .search-input {
    flex: 1;
    height: 40rpx;
    font-size: 28rpx;
  }
  
  .cancel-btn {
    font-size: 28rpx;
    color: #666;
  }
}

.filter-tabs {
  display: flex;
  justify-content: space-between;
  
  .filter-item {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #666;
    
    .arrow {
      font-size: 20rpx;
      margin-left: 5rpx;
    }
  }
}

.banner-wrapper {
  padding: 20rpx 30rpx;
  
  .banner {
    height: 360rpx;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  }
  
  .banner-item {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #f5f7fa;
    
    .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      background-color: #ffffff;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

.function-modules {
  padding: 10rpx 30rpx 30rpx;
  
  .function-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
  }
  
  .function-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 140rpx;
    
    .function-icon {
      width: 100rpx;
      height: 100rpx;
      border-radius: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10rpx;
      
      text {
        font-size: 48rpx;
        color: #fff;
      }
    }
    
    .icon-blue {
      background-color: #42a5f5;
    }
    
    .icon-green {
      background-color: #4cd964;
    }
    
    .icon-orange {
      background-color: #ff9500;
    }
    
    .icon-yellow {
      background-color: #ffcc00;
    }
    
    .function-text {
      font-size: 24rpx;
      color: #333;
    }
  }
}

.jobs-list {
  padding: 0 30rpx;
  
  .job-item {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15rpx;
      
      .job-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        flex: 1;
      }
      
      .job-tag {
        font-size: 28rpx;
        color: #ff9500;
        font-weight: bold;
      }
    }
    
    .job-info {
      font-size: 26rpx;
      color: #999;
      margin-bottom: 20rpx;
    }
    
    .job-tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30rpx;
      
      .tag {
        font-size: 24rpx;
        padding: 10rpx 20rpx;
        border-radius: 10rpx;
        margin-right: 15rpx;
        margin-bottom: 15rpx;
        color: #ffffff;
        
        &.tag-vision {
          background-color: #42a5f5; // 蓝色
        }
        
        &.tag-hearing {
          background-color: #66bb6a; // 绿色
        }
        
        &.tag-speech {
          background-color: #ffa726; // 橙色
        }
        
        &.tag-physical {
          background-color: #ec407a; // 粉色
        }
        
        &.tag-intelligence {
          background-color: #ab47bc; // 紫色
        }
        
        &.tag-mental {
          background-color: #7e57c2; // 深紫色
        }
        
        &.tag-multiple {
          background-color: #ef5350; // 红色
        }
        
        &.tag-other {
          background-color: #78909c; // 灰色
        }
      }
    }
    
    .company-info {
      display: flex;
      align-items: center;
      
      .company-logo {
        width: 80rpx;
        height: 80rpx;
        border-radius: 10rpx;
        margin-right: 20rpx;
        background-color: #f0f0f0;
      }
      
      .company-detail {
        .company-name {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 5rpx;
        }
        
        .company-type {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
  }
}
</style>
