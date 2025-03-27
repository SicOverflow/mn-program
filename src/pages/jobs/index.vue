<template>
  <view class="jobs-container">
    <!-- 分类导航栏 -->
    <scroll-view scroll-x class="category-nav">
      <view 
        v-for="(category, index) in categories" 
        :key="index"
        class="category-item"
        :class="{ active: currentCategory === category.id }"
        @click="switchCategory(category.id)"
      >
        {{ category.name }}
      </view>
    </scroll-view>
    
    <!-- 商品列表 -->
    <scroll-view scroll-y class="product-list">
      <view class="product-grid">
        <view 
          v-for="(product, index) in filteredProducts" 
          :key="index"
          class="product-card"
        >
          <image class="product-image" :src="product.image" mode="aspectFill"></image>
          <view class="product-info">
            <text class="product-name">{{ product.name }}</text>
            <view class="product-meta">
              <text class="product-sales">销量: {{ product.sales }}</text>
              <text class="product-price">{{ product.price }}元</text>
            </view>
            <button class="buy-button">购买</button>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <custom-tab-bar />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import CustomTabBar from '@/components/custom-tab-bar/index.vue'

// 分类数据
const categories = [
  { id: 'pottery', name: '陶艺与黏土类' },
  { id: 'fabric', name: '布艺类' },
  { id: 'bamboo', name: '木竹藤艺类' },
  { id: 'paper', name: '纸艺类' },
  { id: 'other', name: '其他类' }
]

// 当前选中的分类
const currentCategory = ref('pottery')

// 切换分类
const switchCategory = (categoryId) => {
  currentCategory.value = categoryId
}

// 商品数据
const products = [
  // 陶艺与黏土类
  {
    id: 1,
    name: '陶艺作品1',
    price: 59.9,
    sales: 25,
    image: '/static/images/products/陶艺与黏土类/1144fc9caab572cb12b0733a76ca9699.jpg',
    category: 'pottery'
  },
  {
    id: 2,
    name: '陶艺作品2',
    price: 36.9,
    sales: 25,
    image: '/static/images/products/陶艺与黏土类/6b2beff155c1b5933e4117b4ffbff9ad.jpg',
    category: 'pottery'
  },
  {
    id: 3,
    name: '陶艺作品3',
    price: 12.6,
    sales: 25,
    image: '/static/images/products/陶艺与黏土类/cc574253e06c1d6b5512364a37984da9.jpg',
    category: 'pottery'
  },
  
  // 布艺类
  {
    id: 4,
    name: '布艺作品1',
    price: 69.9,
    sales: 25,
    image: '/static/images/products/布艺类/21c78981c09a84b7ea50d5a8c6d0489b.jpg',
    category: 'fabric'
  },
  {
    id: 5,
    name: '布艺作品2',
    price: 59.9,
    sales: 25,
    image: '/static/images/products/布艺类/8b5e07edfd3c156da1dcae80db4ea766.jpg',
    category: 'fabric'
  },
  {
    id: 6,
    name: '布艺作品3',
    price: 24,
    sales: 25,
    image: '/static/images/products/布艺类/b1dc08fd5030a4774a7b0f102e42c9fd.jpg',
    category: 'fabric'
  },
  {
    id: 7,
    name: '布艺作品4',
    price: 35,
    sales: 25,
    image: '/static/images/products/布艺类/b81feb570d0198c1dd0347cc3f2421cd.jpg',
    category: 'fabric'
  },
  {
    id: 8,
    name: '布艺作品5',
    price: 42,
    sales: 25,
    image: '/static/images/products/布艺类/bb03bf84cba0e26844c60aef77c64ccf.jpg',
    category: 'fabric'
  },
  {
    id: 9,
    name: '布艺作品6',
    price: 38,
    sales: 25,
    image: '/static/images/products/布艺类/fab315e39a764e4e8f8f9126c42f24fe.jpg',
    category: 'fabric'
  },
  
  // 木竹藤艺类
  {
    id: 10,
    name: '木竹藤艺作品1',
    price: 39.9,
    sales: 25,
    image: '/static/images/products/木竹藤艺类/2b5fdf65a31cecf982e8f16ad8b4c099.jpg',
    category: 'bamboo'
  },
  {
    id: 11,
    name: '木竹藤艺作品2',
    price: 9.9,
    sales: 25,
    image: '/static/images/products/木竹藤艺类/3f31856ecbc1aea4642d44c664b2f68c.jpg',
    category: 'bamboo'
  },
  {
    id: 12,
    name: '木竹藤艺作品3',
    price: 38.8,
    sales: 25,
    image: '/static/images/products/木竹藤艺类/6475016e93be36a32bd4602c0bdd70eb.jpg',
    category: 'bamboo'
  },
  
  // 纸艺类
  {
    id: 13,
    name: '纸艺作品1',
    price: 11.88,
    sales: 25,
    image: '/static/images/products/纸艺类/b90391b97818ea8f49461cd3a972a140.jpg',
    category: 'paper'
  },
  {
    id: 14,
    name: '纸艺作品2',
    price: 10.88,
    sales: 25,
    image: '/static/images/products/纸艺类/e125b41051682ef8f72cd7b4da19b33c.jpg',
    category: 'paper'
  },
  
  // 其他类
  {
    id: 15,
    name: '其他手工艺品1',
    price: 49.9,
    sales: 25,
    image: '/static/images/products/其他类/47172a25924313106bbf35e8ed8ac035.jpg',
    category: 'other'
  },
  {
    id: 16,
    name: '其他手工艺品2',
    price: 9.9,
    sales: 25,
    image: '/static/images/products/其他类/ae5bfe0c38c520fc56ac3848e853c462.jpg',
    category: 'other'
  }
]

// 根据当前分类筛选商品
const filteredProducts = computed(() => {
  return products.filter(product => product.category === currentCategory.value)
})
</script>

<style lang="scss" scoped>
.jobs-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx; /* Add padding to avoid content being hidden by tab bar */
  display: flex;
  flex-direction: column;
}

/* 分类导航栏样式 */
.category-nav {
  display: flex;
  white-space: nowrap;
  background-color: #fff;
  padding: 0 20rpx;
  height: 80rpx;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.category-item {
  display: inline-block;
  padding: 0 30rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  position: relative;
  color: #333;
}

.category-item.active {
  color: #000;
  font-weight: bold;
}

.category-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #000;
  border-radius: 2rpx;
}

/* 商品列表样式 */
.product-list {
  flex: 1;
  padding: 20rpx;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-card {
  width: 48%;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.product-image {
  width: 100%;
  height: 320rpx;
  background-color: #f8f8f8;
}

.product-info {
  padding: 16rpx;
}

.product-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
  font-weight: 500;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.product-sales {
  font-size: 24rpx;
  color: #999;
}

.product-price {
  font-size: 32rpx;
  color: #9c8851;
  font-weight: bold;
}

.buy-button {
  background-color: #fff;
  color: #9c8851;
  font-size: 24rpx;
  height: 60rpx;
  line-height: 60rpx;
  border: 2rpx solid #9c8851;
  border-radius: 30rpx;
  margin: 0;
  padding: 0 30rpx;
  float: right;
}
</style>