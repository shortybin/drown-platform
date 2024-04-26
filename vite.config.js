import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { resolve } from "path";
import postCssPxToRem from "postcss-pxtorem";
import tailwindcss from "tailwindcss";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        // 后台地址
        target: "http://8.141.1.192:8080/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
      "@pages": resolve(__dirname, "src/pages"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@router": resolve(__dirname, "src/router"),
      "@store": resolve(__dirname, "src/store"),
      "@api": resolve(__dirname, "src/api"),
      "@constants": resolve(__dirname, "src/constants"),
      "@utils": resolve(__dirname, "src/utils"),
      "@style": resolve(__dirname, "src/style"),
      "@directives": resolve(__dirname, "src/directives"),
    },
    extensions: [".js", ".vue", ".css"],
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        postCssPxToRem({
          rootValue: 16,
          propList: ["*", "!border"],
        }),
      ],
    },
  },
});
