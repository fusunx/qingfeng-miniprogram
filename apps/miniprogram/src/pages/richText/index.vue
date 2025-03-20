<template>
  <page-head :title="title"></page-head>
  <view class="uni-common-mt" style="background: #fff; padding: 20rpx">
    <rich-text :nodes="strings"></rich-text>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";

const title = ref("富文本");
const strings = ref(
  '<div style="text-align:center;"><img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png"/></div>'
);
</script>
