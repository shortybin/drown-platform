import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//全局样式
import "./assets/styles/public.css";
import "./assets/styles/reset.css";

import "@utils/flexible";

const app = createApp(App);

app.use(router).use(store).mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
