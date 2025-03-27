<template>
  <view class="message-container">
    <!-- 左侧导航栏 -->
    <view class="left-sidebar">
      <view class="sidebar-menu">
        <view 
          v-for="(item, index) in menuItems" 
          :key="index"
          class="menu-item"
          :class="{ active: currentTab === item.id }"
          @click="handleTabChange(item.id)"
        >
          <view class="menu-item-content">
            <view class="dot"></view>
            <text class="menu-text">{{ item.text }}</text>
          </view>
          <view v-if="item.badge" class="badge">{{ item.badge }}</view>
        </view>
      </view>
    </view>

    <!-- 右侧消息区域 -->
    <view class="right-content">
      <view class="message-box">
        <!-- 消息显示区域 -->
        <scroll-view 
          class="message-list"
          scroll-y
          :scroll-top="scrollTop"
          @scrolltoupper="loadMoreMessages"
        >
          <view v-if="messages.length === 0" class="empty-state">
            暂无消息
          </view>
          <view 
            v-for="(msg, index) in messages" 
            :key="index"
            class="message-item"
          >
            <view class="message-info">
              <text class="message-time">{{ msg.time }}</text>
              <text class="message-sender">{{ msg.sender }}</text>
            </view>
            <view class="message-content">{{ msg.content }}</view>
          </view>
        </scroll-view>

        <!-- 消息回复区域 -->
        <view class="reply-box">
          <textarea 
            class="reply-input"
            v-model="replyContent"
            placeholder="请输入回复内容..."
            :maxlength="500"
            auto-height
          />
          <view class="reply-actions">
            <text class="char-count">{{ replyContent.length }}/500</text>
            <button class="send-btn" @click="handleSend">发送</button>
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

const menuItems = ref([
  { id: 'system', text: '系统通知' },
  { id: 'my', text: '我的消息' },
  { id: 'replies', text: '回复我的' },
  { id: 'likes', text: '收到的赞' },
])

const currentTab = ref('system')
const messages = ref([])
const replyContent = ref('')
const scrollTop = ref(0)

const handleTabChange = (tabId) => {
  currentTab.value = tabId
  // 这里可以添加加载对应标签页消息的逻辑
}

const loadMoreMessages = () => {
  // 这里添加加载更多消息的逻辑
}

const handleSend = () => {
  if (!replyContent.value.trim()) {
    uni.showToast({
      title: '请输入回复内容',
      icon: 'none'
    })
    return
  }
  // 这里添加发送消息的逻辑
  replyContent.value = ''
}
</script>

<style lang="scss" scoped>
.message-container {
  min-height: 100vh;
  background-color: #DFDBE5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%239C92AC' fill-opacity='0.16'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  display: flex;
  padding-top: var(--status-bar-height);
  padding-bottom: 120rpx;

  .left-sidebar {
    width: 140rpx;
    background-color: #fff;
    border-right: 1px solid #eee;
    display: flex;
    flex-direction: column;
    padding-top: 20rpx;
    
    .sidebar-menu {
      flex: 1;
      
      .menu-item {
        position: relative;
        padding: 20rpx 8rpx;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-left: 4rpx solid transparent;
        
        &.active {
          background-color: #f5f7fa;
          border-left-color: #4285f4;
          
          .menu-text {
            color: #4285f4;
          }
          .dot {
            background-color: #4285f4;
          }
        }

        .menu-item-content {
          display: flex;
          align-items: center;
          width: 100%;
        }
        
        .dot {
          width: 6rpx;
          height: 6rpx;
          border-radius: 50%;
          background-color: #666;
          margin-right: 6rpx;
          flex-shrink: 0;
        }
        
        .menu-text {
          font-size: 20rpx;
          color: #666;
          width: 100%;
          text-align: left;
          padding-left: 4rpx;
        }
      }
    }
  }

  .right-content {
    flex: 1;
    padding: 20rpx;
    
    .message-box {
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
      height: calc(100vh - var(--status-bar-height) - 180rpx);
      display: flex;
      flex-direction: column;
      
      .message-list {
        flex: 1;
        padding: 20rpx;
        
        .empty-state {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 28rpx;
        }
        
        .message-item {
          margin-bottom: 20rpx;
          padding: 20rpx;
          background-color: #f5f7fa;
          border-radius: 12rpx;
          
          .message-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10rpx;
            
            .message-time {
              font-size: 24rpx;
              color: #999;
            }
            
            .message-sender {
              font-size: 26rpx;
              color: #666;
            }
          }
          
          .message-content {
            font-size: 28rpx;
            color: #333;
            line-height: 1.5;
          }
        }
      }
      
      .reply-box {
        padding: 20rpx;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        width: 100%;
        
        .reply-input {
          width: 100%;
          min-height: 80rpx;
          padding: 20rpx;
          background-color: #f5f7fa;
          border-radius: 12rpx;
          font-size: 28rpx;
          line-height: 1.5;
          box-sizing: border-box;
        }
        
        .reply-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20rpx;
          width: 100%;
          box-sizing: border-box;
          
          .char-count {
            font-size: 24rpx;
            color: #999;
          }
          
          .send-btn {
            background-color: #4285f4;
            color: #fff;
            font-size: 24rpx;
            padding: 10rpx 30rpx;
            border-radius: 30rpx;
            border: none;
            line-height: 1.2;
            min-height: 0;
          }
        }
      }
    }
  }
}
</style> 