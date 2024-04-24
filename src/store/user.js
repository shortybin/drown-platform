// @description 登录、获取用户信息、退出登录、清除accessToken逻辑


import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    username:  "",
    userPhone: "",
  }),
  actions: {
    async login(data) {
    //   const res = await systemModule.login(data);
    //   this.loginHandler(res.data);
      return true;
    },
    async loginByOA(queryObj) {
      if (typeof queryObj === "object" && queryObj !== null) {
        // const res = await systemModule.loginByOA(queryObj);
        // this.loginHandler(res.data);
        return true;
      }
    },
    async logout() {
      // this.username = "";
      // removeUsername();
      // this.token = "";
      // removeAccessToken();
      // window.location.reload();
    },
  },
});
