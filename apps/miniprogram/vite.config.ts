import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  // 开发服务器选项 https://cn.vitejs.dev/config/server-options
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        // mock代理目标地址
        target: "http://localhost:4000/",
        ws: true,
      },
      "/uploads": {
        changeOrigin: true,
        // mock代理目标地址
        target: "http://localhost:4000/",
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        require("autoprefixer")({
          overrideBrowserslist: ["Android >= 4", "ios >= 8"],
          remove: process.env.UNI_PLATFORM !== "h5",
        }),
      ],
    },
  },
});
