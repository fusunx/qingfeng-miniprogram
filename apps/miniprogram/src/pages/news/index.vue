<template>
  <view class="content">
    <!-- 顶部图片 -->
    <image class="top-img" :src="getStaticUrl(pageConfig?.policyTopImg)" mode="widthFix" @click="toCheck" />

    <!-- 文章列表 -->
    <view class="article-container" v-for="item in articleList" :key="item.id">
      <uni-card :is-shadow="true" is-full @click="() => handleToRichText(item.id)">
        <view class="article-item">
          <view class="article-item-title">
            <text>{{ item.name }}</text>
          </view>
          <view class="article-item-content">
            <text>钦丰康养</text>
            <text>{{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}</text>
          </view>
        </view>
      </uni-card>
    </view>

    <!-- 加载更多按钮 -->
    <view @click="handleLoadMore" class="loadMoreContainer">
      <text class="text">{{ loadText }}</text>
      <uni-icons v-if="showFlashIcon" type="loop" size="20" color="#e3d90b" :class="{ rotate: isLoading }"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getPageConfigApi } from "@/api/modules/page";
import { IArticleDetail, ICommonListResult, IPageConfig } from "@qinfeng/types";
import { ref, computed } from "vue";
import { getStaticUrl } from "@/api/request";
import { getArticleListApi } from "@/api/modules/article";
import dayjs from "dayjs";

let page = 1;
let total = 0;

const pageConfig = ref<IPageConfig>();
const articleList = ref<IArticleDetail[]>([]);

const showFlashIcon = computed(() => {
  return articleList.value.length < total;
});

const loadText = computed(() => {
  return !showFlashIcon.value ? "没有更多了" : "加载更多";
});

// 加载中
const isLoading = ref(false);
// 加载更多
const handleLoadMore = async () => {
  if (articleList.value.length >= total) {
    return;
  }
  isLoading.value = true;
  await getArticleList();
  isLoading.value = false;
};

const getArticleList = async () => {
  const res = await getArticleListApi<ICommonListResult<IArticleDetail>>({
    page,
    pageSize: 20,
  });
  page++;
  articleList.value.push(...res.data);
  total = res.total;
};

const handleToRichText = (id: number) => {
  uni.navigateTo({
    url: `/pages/richText/index?id=${id}`,
  });
};

const toCheck = () => {
  console.log("toCheck");
  uni.navigateTo({
    url: "/pages/staticImage/index",
  });
};

const init = async () => {
  console.log("init");
  const res = await getPageConfigApi<IPageConfig>();
  pageConfig.value = res;
  await getArticleList();
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
