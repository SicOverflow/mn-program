<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
    uni.$emit('onShow')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
@import '@/static/icofont/icofont.min.css';
@import '@/static/icofont/icofont2.min.css';
@import '@/static/icofont/icofont3.min.css';

/*每个页面公共css */
page {
  background-color: #f5f7fa;
}

/* 隐藏系统 tabBar 的文字和图标（但保留点击功能） */
.uni-tabbar-bottom {
  border-top: none !important;
}

.uni-tabbar-bottom .uni-tabbar__icon {
  opacity: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.uni-tabbar-bottom .uni-tabbar__label {
  opacity: 0 !important;
  height: 0 !important;
}
</style>
