import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
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
