import type { RouteRecordRaw } from "vue-router";

function Layout() {
  return import("@/layouts/index.vue");
}

const routes: RouteRecordRaw = {
  path: "/page_setting",
  component: Layout,
  redirect: "/page_setting/index",
  name: "pageSetting",
  meta: {
    title: "页面设置",
    icon: "i-heroicons-solid:menu-alt-3",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/page_setting/index.vue"),
      name: "pageSettingIndex",
      meta: {
        title: "页面设置",
      },
    },
  ],
};

export default routes;
