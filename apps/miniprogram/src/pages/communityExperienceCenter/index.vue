<template>
  <view class="content">
    <!-- 顶部图片 -->
    <image class="top-img" :src="getStaticUrl(pageConfig?.experienceTopImg)" mode="widthFix" />

    <!-- 商品列表 -->
    <view class="goods-list">
      <template v-for="good in goodList" :key="good.id">
        <Card class="card" :good="good" />
      </template>
    </view>

    <!-- 加载更多按钮 -->
    <view @click="handleLoadMore" class="loadMoreContainer">
      <text class="text">{{ loadText }}</text>
      <uni-icons v-if="showFlashIcon" type="loop" size="20" color="#e3d90b" :class="{ rotate: isLoading }"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Card from "@/components/Card.vue";
import { ICommonListResult, IPageConfig, type IGood } from "@qinfeng/types";
import { getPageConfigApi } from "@/api/modules/page";
import { getGoodListApi } from "@/api/modules/good";
import { getStaticUrl } from "@/api/request";

let page = 1;
let total = 0;

const pageConfig = ref<IPageConfig>();
const goodList = ref<IGood[]>([]);

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
