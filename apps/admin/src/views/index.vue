<route lang="yaml">
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
const versionType = ref("basic");
watch(versionType, (val) => {
  if (val === "pro") {
    location.href = `${location.origin}${location.pathname}`.replace(
      "basic-example",
      "pro-example",
    );
  }
});
</script>

<template>
  <div>
    <FaPageHeader>
      <template #title>
        <div class="flex items-center gap-4">钦丰康养</div>
      </template>
    </FaPageHeader>
  </div>
</template>

<style scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.title-info {
  --uno: flex items-center gap-4;

  img {
    --uno: block w-12 h-12;
  }

  h1 {
    --uno: m-0 text-2xl;
  }

  h2 {
    --uno: m-0 text-base text-secondary-foreground/50 font-normal;
  }
}
</style>
