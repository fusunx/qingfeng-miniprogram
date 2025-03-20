<template>
  <view class="content">
    <!-- 顶部图片 -->
    <image class="top-img" src="/static/logo.png" mode="widthFix" />
    <!-- 视频 -->
    <video
      id="myVideo"
      class="video"
      src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
      @error="videoErrorCallback"
      controls
    ></video>
    <!-- 顶部第二张图片 -->
    <image class="top-img" src="/static/logo.png" mode="widthFix" />

    <!-- 商品列表 -->
    <GoodList :goodList="mockGoodsList" :columns="3"></GoodList>

    <!-- 加载更多按钮 -->
    <view @click="handleLoadMore" class="loadMoreContainer">
      <text class="text">加载更多</text>
      <uni-icons type="loop" size="20" color="#e3d90b" :class="{ rotate: isLoading }"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/Card.vue";
import GoodList from "@/components/GoodList.vue";
import { type IGood } from "@qinfeng/types";

const mockGoodsList: IGood[] = [
  {
    id: 1,
    name: "测试商品测试商品测试商品测试商品测试商品测试商品",
    price: 200.0,
    img: "https://m.lailaieshop.com/uploads/3499f52e-12e0-4115-841b-318dda1daa98.webp",
  },
  {
    id: 2,
    name: "测试商品测试商品测试商品测试商品测试商品测试商品",
    price: 200.0,
    img: "https://m.lailaieshop.com/uploads/3499f52e-12e0-4115-841b-318dda1daa98.webp",
  },
  {
    id: 3,
    name: "测试商品测试商品测试商品测试商品测试商品测试商品",
    price: 200.0,
    img: "https://m.lailaieshop.com/uploads/3499f52e-12e0-4115-841b-318dda1daa98.webp",
  },
  {
    id: 4,
    name: "测试商品测试商品测试商品测试商品测试商品测试商品",
    price: 200.0,
    img: "https://m.lailaieshop.com/uploads/3499f52e-12e0-4115-841b-318dda1daa98.webp",
  },
  {
    id: 5,
    name: "测试商品测试商品测试商品测试商品测试商品测试商品",
    price: 200.0,
    img: "https://m.lailaieshop.com/uploads/3499f52e-12e0-4115-841b-318dda1daa98.webp",
  },
  {
    id: 6,
    name: "测试商品测试商品测试商品测试商品测试商品测试商品",
    price: 200.0,
    img: "https://m.lailaieshop.com/uploads/3499f52e-12e0-4115-841b-318dda1daa98.webp",
  },
  {
    id: 7,
    name: "测试商品测试商品测试商品测试商品测试商品测试商品",
    price: 200.0,
    img: "https://m.lailaieshop.com/uploads/3499f52e-12e0-4115-841b-318dda1daa98.webp",
  },
  {
    id: 8,
    name: "测试商品测试商品测试商品测试商品测试商品测试商品",
    price: 200.0,
    img: "https://m.lailaieshop.com/uploads/3499f52e-12e0-4115-841b-318dda1daa98.webp",
  },
];

const videoErrorCallback = (e: any) => {
  console.log("视频错误信息:", e.detail.errMsg);
};

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
  .video {
    width: 100vw;
  }
  .goods-list {
    width: 100vw;
    display: flex; /* 激活 Flex 布局 */
    justify-content: flex-start;
    padding: 32rpx 3vw;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: wrap;
    .card {
      /* 或者指定固定宽度，比如 width: 300px; */
      width: 30vw;
      margin-top: 2vw;
      margin-right: 2vw;
    }
    .card:nth-child(3n) {
      margin-right: 0;
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
