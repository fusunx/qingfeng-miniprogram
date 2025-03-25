<template>
  <page-head :title="title"></page-head>
  <view class="uni-common-mt" style="background: #fff; padding: 20rpx">
    <rich-text :nodes="strings"></rich-text>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getArticleApi } from "@/api/modules/article";
import { IArticleDetail } from "@qinfeng/types";

const title = ref("");
const strings = ref("");

// 在 onLoad 函数中获取路由参数
onLoad(async (option: any) => {
  console.log("onLoad", option);
  // 从路由参数中获取商品ID
  const id = option.id;
  const res = await getArticleApi<IArticleDetail>(id);
  strings.value = res.content;
  title.value = res.name;
});
</script>
