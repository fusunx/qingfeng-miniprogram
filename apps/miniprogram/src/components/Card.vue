<template>
  <view class="card" @click="toDetail">
    <image class="card-img" src="/static/logo.png" mode="widthFix" />
    <view class="card-title ellipsis-2">
      {{ title }}
    </view>
    <!-- 卡片底部元素 -->
    <view class="card-bottom">
      <view class="card-price">
        {{ price }}
      </view>
      <uni-icons type="cart-filled" size="24" color="#e3d90b" @click="handleBuy"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type IGood } from "@qinfeng/types";
const title = ref("测试商品测试商品测试商品测试商品测试商品测试商品");
const price = ref("200.00");
const good = ref<IGood>();
const props = defineProps<{ good: IGood }>();

const handleBuy = () => {};

const toDetail = () => {
  console.log("toDetail");
  uni.navigateTo({
    url: "/pages/goodDetail/index?id=1",
  });
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding-bottom: 20rpx;
}
.card-img {
  width: 100%;
}
.card-title {
  font-size: 28rpx;
  color: #333;
  margin-top: 10rpx;
  padding: 0 12rpx;
  font-weight: bold;
}
.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 12rpx;
  margin-top: 10rpx;
  font-size: 22rpx;
  padding: 0 12rpx;
  box-sizing: border-box;
}
</style>
