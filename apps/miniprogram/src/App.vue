<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
.ellipsis-2 {
  display: -webkit-box; /* 必须结合 -webkit-box-orient 一起使用 */
  -webkit-line-clamp: 2; /* 限制显示的行数 */
  -webkit-box-orient: vertical;
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 部分浏览器可能忽略该属性，但可留作兼容 */
}
</style>
