<template>
  <view class="content">
    <view class="page-left">
      <template v-for="(item, index) in categoryList" :key="index">
        <view
          class="page-left-title"
          :class="{ active: activeCategoryId === item.id }"
          @click="() => handleCategoryChange(item.id)"
        >
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
import { ICategoryDetail, ICommonListResult, type ICategory, type IGood } from "@qinfeng/types";
import GoodList from "@/components/GoodList.vue";
import { getGoodListApi, getCategoryApi } from "@/api/modules/good";

const categoryList = ref<ICategory[]>([]);
const activeCategoryId = ref<number>();

const loadingStatus = ref<"loading" | "noMore" | "more">("more");

const goodList = ref<IGood[]>([]);

let page = 1;

const loadGoodList = async () => {
  try {
    loadingStatus.value = "loading";
    const res = await getGoodListApi<ICommonListResult<IGood>>({
      page,
      pageSize: 20,
      categoryId: activeCategoryId.value,
    });
    goodList.value?.push(...res.data);
    if (goodList.value.length >= res.total) {
      loadingStatus.value = "noMore";
    } else {
      loadingStatus.value = "more";
    }
    page++;
  } catch (error) {
    console.log(error);
  }
};

const handleScrollToLower = () => {
  // 如果正在加载或者已经无数据，则直接退出
  if (loadingStatus.value === "noMore" || loadingStatus.value === "loading") {
    return;
  }
  loadGoodList();
};

const handleCategoryChange = async (id: number) => {
  activeCategoryId.value = id;
  page = 1;
  goodList.value = [];
  await loadGoodList();
};

const init = async () => {
  const res = await getCategoryApi<ICommonListResult<ICategoryDetail>>({ page: 1, pageSize: 100 });
  categoryList.value = res.data;
  activeCategoryId.value = res.data[0].id;
  await loadGoodList();
};

init();
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
      width: 15vw;
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
