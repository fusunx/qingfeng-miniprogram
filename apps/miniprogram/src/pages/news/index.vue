<template>
  <view class="content">
    <!-- 顶部图片 -->
    <image class="top-img" src="/static/logo.png" mode="widthFix" />

    <!-- 文章列表 -->
    <view class="article-container">
      <uni-card :is-shadow="true" is-full>
        <view class="article-item">
          <view class="article-item-title">
            <text>文章标题</text>
          </view>
          <view class="article-item-content">
            <text>钦丰康养</text>
            <text>2024-11-06 08:32:48</text>
          </view>
        </view>
      </uni-card>
    </view>

    <!-- 加载更多按钮 -->
    <view @click="handleLoadMore" class="loadMoreContainer">
      <text class="text">加载更多</text>
      <uni-icons type="loop" size="20" color="#e3d90b" :class="{ rotate: isLoading }"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 加载中
const isLoading = ref(false);
// 加载更多
const handleLoadMore = () => {
  isLoading.value = true;
  console.log("加载更多");
  // 模拟异步操作
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 32rpx;
  .top-img {
    width: 100vw;
  }

  .article-container {
    width: 100vw;
    padding: 4vw;
    box-sizing: border-box;
    .article-item {
      padding: 20rpx;
      .article-item-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      .article-item-content {
        margin-top: 2vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        color: #888;
      }
    }
  }

  .loadMoreContainer {
    display: flex;
    align-items: center;
    .text {
      font-size: 28rpx;
      color: #e3d90b;
    }
  }
}

.rotate {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
