<template>
  <div class="container">
    <image class="img" :mode="mode" src="../../static/imgs/img-policy.jpg" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const mode = ref("widthFix");
</script>
<style scoped>
.container {
  width: 100vw;
}
.img {
  width: 100%;
}
</style>
