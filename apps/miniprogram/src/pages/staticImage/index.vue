<template>
  <div class="container">
    <image class="img" :mode="mode" :src="getStaticUrl(pageConfig?.policyTopDetailImg)" />
  </div>
</template>
<script setup lang="ts">
import { getPageConfigApi } from "@/api/modules/page";
import { getStaticUrl } from "@/api/request";
import { IPageConfig } from "@qinfeng/types";
import { ref } from "vue";
const pageConfig = ref<IPageConfig>();
const mode = ref("widthFix");

const init = async () => {
  const res = await getPageConfigApi<IPageConfig>();
  pageConfig.value = res;
};

init();
</script>
<style scoped>
.container {
  width: 100vw;
}
.img {
  width: 100%;
}
</style>
