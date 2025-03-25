<template>
  <view class="page">
    <swiper v-if="goodData" class="swiper" circular :interval="2000" :duration="500">
      <swiper-item v-for="(src, index) in goodData.swiperImgs" :key="index">
        <video v-if="isMp4(src)" class="swiper-content" :src="getStaticUrl(src)" controls></video>
        <image v-else class="swiper-content" mode="aspectFit" :src="getStaticUrl(src)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息 -->
    <view class="good-info">
      <uni-card :is-shadow="true" is-full class="w-full">
        <view>
          <view class="good-info-name ellipsis-2">
            {{ goodData?.name }}
          </view>

          <view class="good-info-sale-container">
            <view class="sales">销量：{{ goodData?.sales }}</view>
            <view class="price-container">
              ¥ <text class="price">{{ goodData?.price }} </text>
            </view>
          </view>
        </view>
      </uni-card>
    </view>

    <!-- 商品表格信息 -->
    <view class="good-table">
      <uni-card :is-shadow="true" is-full>
        <view class="good-table-container">
          <view v-for="(item, index) in goodData?.detailTable" :key="index" class="good-table-item-container">
            <view class="good-table-label">{{ item.label }}: </view>
            <view class="good-table-value">{{ item.value }}</view>
          </view>
        </view>
      </uni-card>
    </view>

    <!-- 商品详情图，可能多张 -->
    <view class="detail-img-container">
      <image class="detail-img" mode="widthFix" :src="getStaticUrl(goodData?.detailImg)"></image>
    </view>

    <!-- 底部按钮区域 -->
    <view class="fixed-bottom-area">
      <view class="fixed-bottom-area-container">
        <view class="fixed-bottom-area-item bg-to-home" @click="toHome">
          <text>首页</text>
        </view>
        <view class="fixed-bottom-area-item" @click="handleBuy">
          <text>立即购买</text>
        </view>
      </view>
    </view>

    <uni-popup ref="popup" background-color="#fff">
      <view class="popup-content">
        <image mode="aspectFit" :src="getStaticUrl(pageConfig?.customerServiceWechatQrCode)"></image>
        <view class="popup-text">请扫码添加客服微信购买</view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { IGoodDetail, IPageConfig, type IGood } from "@qinfeng/types";
import { getGoodApi } from "@/api/modules/good";
import { getStaticUrl } from "@/api/request";
import { getPageConfigApi } from "@/api/modules/page";

const isMp4 = (src: string) => {
  return src.endsWith(".mp4");
};

const goodData = ref<IGood>();
const popup = ref();
const pageConfig = ref<IPageConfig>();

// 回到首页
const toHome = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};

const handleBuy = () => {
  popup.value.open();
};

// 在 onLoad 函数中获取路由参数
onLoad(async (option: any) => {
  console.log("onLoad", option);
  // 从路由参数中获取商品ID
  const goodId = option.id;
  const res = await getGoodApi<IGoodDetail>(goodId);
  goodData.value = res;
});

const init = async () => {
  const res = await getPageConfigApi<IPageConfig>();
  pageConfig.value = res;
};
init();
</script>
<style scoped lang="scss">
.page {
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 14vw;

  .popup-content {
    padding-bottom: 20rpx;
  }
  .popup-text {
    text-align: center;
  }

  .w-full {
    width: 100%;
  }

  .swiper-content {
    width: 100vw;
    height: 300rpx;
  }
  .good-info {
    widows: 100vw;
    display: flex;
    justify-content: center;
    padding: 4vw;

    .good-info-name {
      font-weight: bold;
      color: black;
    }

    .good-info-sale-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2vw;

      .sales {
        color: #888;
        font-size: 28rpx;
      }
      .price-container {
        display: flex;
        align-items: baseline;
        color: #e3d90b;
        font-size: 26rpx;
        .price {
          font-size: 36rpx;
          font-weight: bold;
        }
      }
    }
  }

  .good-table {
    padding: 0 4vw 0;
    .good-table-container {
      display: flex;
      flex-wrap: wrap;
      border-radius: 8rpx;
      overflow: hidden;

      .good-table-item-container {
        display: flex;
        align-items: center;
        width: 50%;
        padding: 16rpx;
        box-sizing: border-box;
        border: 1rpx solid #eee;
        color: #888;
        &:nth-child(even) {
          border-left: none;
        }
        &:nth-child(n + 3) {
          border-top: none;
        }
        .good-table-label {
          flex: 1;
          text-align: right;
          padding-right: 16rpx;
        }
        .good-table-value {
          flex: 1;
          text-align: left;
          padding-left: 16rpx;
        }
      }
    }
  }

  .detail-img-container {
    padding: 4vw 0;
    width: 100vw;
    .detail-img {
      width: 100vw;
      padding: 0;
      margin: 0;
      vertical-align: top;
    }
  }

  .fixed-bottom-area {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2vw 4vw;
    background-color: #fff;
    box-shadow: 0 -2rpx 4rpx rgba(0, 0, 0, 0.1);
    z-index: 100;
    .fixed-bottom-area-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .fixed-bottom-area-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40vw;
        height: 10vw;
        border-radius: 40rpx;
        background: linear-gradient(to right, #ff416c, #ff4b2b); // 红色渐变
        color: #fff;
        font-size: 28rpx;
        font-weight: bold;
      }
      .bg-to-home {
        background: linear-gradient(to right, #4facfe, #00f2fe); // 蓝色渐变
      }
    }
  }
}
</style>
