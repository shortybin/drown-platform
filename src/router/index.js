import LayoutMenu from "@pages/LayoutMenu";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: LayoutMenu,
    hidden: true,
    children: [
      {
        path: "/",
        component: () => import("@pages/Home"),
        name: "homePage",
        breadcrumb: false,
        meta: {
          title: "首页",
          icon: "HomeFilled",
        },
      },
      {
        path: "/railsetting",
        component: () => import("@pages/RailSetting"),
        meta: {
          title: "电子围栏设置",
          icon: "Crop",
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@pages/LoginPage"),
  },
  {
    path: "/404",
    component: () => import("@pages/NotFound"),
    hidden: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFount",
    redirect: "/404",
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
