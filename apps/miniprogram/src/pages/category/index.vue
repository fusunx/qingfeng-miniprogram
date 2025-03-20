<template>
  <view class="content">
    <view class="page-left">
      <template v-for="(item, index) in categoryList" :key="index">
        <view class="page-left-title" :class="{ active: activeCategoryId === item.id }">
          {{ item.name }}
        </view>
      </template>
    </view>
    <view class="page-right">
      <scroll-view class="scroll-container" scroll-y lower-threshold="50" @scrolltolower="handleScrollToLower">
        <!-- 商品列表 -->
        <GoodList :goodList="goodList" :columns="2"></GoodList>
        <!-- 加载提示 -->
        <uni-load-more :status="loadingStatus"></uni-load-more>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type ICategory, type IGood } from "@qinfeng/types";
import GoodList from "@/components/GoodList.vue";
const mockCategoryList = [
  {
    id: 1,
    name: "Category 1",
  },
  {
    id: 2,
    name: "Category 2",
  },
  {
    id: 3,
    name: "Category 3",
  },
  {
    id: 4,
    name: "Category 4",
  },
];

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

const categoryList = ref<ICategory[]>(mockCategoryList);
const activeCategoryId = ref<number>(1);

const loadingStatus = ref<"loading" | "noMore" | "more">("more");

const goodList = ref<IGood[]>([]);

let page = 1;

const loadGoodList = () => {
  loadingStatus.value = "loading";
  setTimeout(() => {
    goodList.value?.push(...mockGoodsList);
    if (goodList.value.length > 30) {
      loadingStatus.value = "noMore";
    } else {
      loadingStatus.value = "more";
    }
  }, 1000);
};

const handleScrollToLower = () => {
  // 如果正在加载或者已经无数据，则直接退出
  if (loadingStatus.value === "noMore" || loadingStatus.value === "loading") {
    return;
  }
  loadGoodList();
};

loadGoodList();
</script>

<style scoped lang="scss">
.content {
  display: flex;
  background: #f5f5f5;
  height: 100vh;
  .page-left {
    width: 25vw;
    height: 100%;
    .page-left-title {
      padding: 20rpx;
      font-size: 26rpx;
      color: #333;
    }
    .page-left-title.active {
      color: black;
      font-weight: bold;
    }
  }
  .page-right {
    flex: 1;
    height: 100%;
    background: #fff;
    .scroll-container {
      height: 100vh;
      box-sizing: border-box;
    }
  }
}
</style>
