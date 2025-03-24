<template>
  <view class="content">
    <!-- 顶部图片 -->
    <image class="top-img" :src="getStaticUrl(pageConfig?.homeFirstImg)" mode="widthFix" />
    <!-- 视频 -->
    <video
      id="myVideo"
      class="video"
      :src="getStaticUrl(pageConfig?.homeVideo)"
      @error="videoErrorCallback"
      controls
    ></video>
    <!-- 顶部第二张图片 -->
    <image class="top-img" :src="getStaticUrl(pageConfig?.homeSecondImg)" mode="widthFix" />

    <!-- 商品列表 -->
    <GoodList :goodList="goodList" :columns="3"></GoodList>

    <!-- 加载更多按钮 -->
    <view @click="handleLoadMore" class="loadMoreContainer">
      <text class="text">{{ loadText }}</text>
      <uni-icons v-if="showFlashIcon" type="loop" size="20" color="#e3d90b" :class="{ rotate: isLoading }"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import GoodList from "@/components/GoodList.vue";
import { ICommonListResult, IPageConfig, type IGood } from "@qinfeng/types";
import { getPageConfigApi } from "@/api/modules/page";
import { getStaticUrl } from "@/api/request";
import { getGoodListApi } from "@/api/modules/good";

let page = 1;
let total = 0;

const pageConfig = ref<IPageConfig>();
const goodList = ref<IGood[]>([]);

const videoErrorCallback = (e: any) => {
  console.log("视频错误信息:", e.detail.errMsg);
};

const showFlashIcon = computed(() => {
  return goodList.value.length < total;
});

const loadText = computed(() => {
  return !showFlashIcon.value ? "没有更多了" : "加载更多";
});

// 加载中
const isLoading = ref(false);
// 加载更多
const handleLoadMore = async () => {
  if (goodList.value.length >= total) {
    return;
  }
  isLoading.value = true;
  await getGoodList();
  isLoading.value = false;
};

const getGoodList = async () => {
  const res = await getGoodListApi<ICommonListResult<IGood>>({
    page,
    pageSize: 20,
  });
  page++;
  goodList.value.push(...res.data);
  total = res.total;
};

const init = async () => {
  const res = await getPageConfigApi<IPageConfig>();
  pageConfig.value = res;
  await getGoodList();
};

init();
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
