<template>
  <!-- 商品列表 -->
  <view class="goods-list">
    <template v-for="good in goodList" :key="good.id">
      <Card :class="cardClass" :good="good" />
    </template>
  </view>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import { type IGood } from "@qinfeng/types";
import { computed } from "vue";

const props = defineProps<{
  goodList: IGood[];
  columns: number;
}>();

const cardClass = computed(() => {
  return props.columns === 2 ? "card45" : "card30";
});
</script>

<style scoped lang="scss">
.goods-list {
  width: 100%;
  display: flex; /* 激活 Flex 布局 */
  justify-content: flex-start;
  padding: 32rpx 3vw;
  box-sizing: border-box;
  flex-direction: row;
  flex-wrap: wrap;
  .card30 {
    /* 或者指定固定宽度，比如 width: 300px; */
    width: 31%;
    margin-top: 2vw;
    margin-right: 2vw;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  .card45 {
    /* 或者指定固定宽度，比如 width: 300px; */
    width: 45%;
    margin-top: 2vw;
    margin-right: 2vw;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
