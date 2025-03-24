import type { RouteRecordRaw } from "vue-router";

function Layout() {
  return import("@/layouts/index.vue");
}

const routes: RouteRecordRaw = {
  path: "/category",
  component: Layout,
  redirect: "/category/index",
  name: "category",
  meta: {
    title: "管理",
    icon: "heroicons-solid:adjustments-horizontal",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/category/index.vue"),
      name: "categoryIndex",
      meta: {
        title: "分类管理",
      },
    },
    {
      path: "good",
      component: () => import("@/views/good/index.vue"),
      name: "good",
      meta: {
        title: "商品管理",
      },
    },
    {
      path: "article",
      component: () => import("@/views/article/index.vue"),
      name: "article",
      meta: {
        title: "文章管理",
      },
    },
  ],
};

export default routes;
