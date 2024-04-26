import { hideLoading, showLoading } from "@utils/loading";
import axios from "axios";
import { ElMessage as Message } from "element-plus";

class BaseApi {
  constructor() {
    this.$http = $http;
  }

  get(url, config = {}) {
    return this.$http.get(url, config);
  }

  post(url, data = undefined, config = {}) {
    return this.$http.post(url, data, config);
  }

  put(url, data = undefined, config = {}) {
    return this.$http.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.$http.delete(url, config);
  }
}

const $http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

const errorHandle = (status, resp) => {
  const msg = formatErrMsg(resp);

  switch (status) {
    case 2001:
      Message.error(msg);
      cookie.removeCookies(COOKIE_TOKEN_KEY);
      window.location.reload();
      break;
    default:
      Message.error(msg);
  }
};

/*
 * 错误拦截(测试环境下封装)
 * TOKEN过期, 删除toke, 记录url跳转到登录页
 */
$http.interceptors.response.use(
  (response) => {
    hideLoading();
    const resp = response.data; // 后台出错时可能是返回的错误详情字符串, 后端解决
    if (resp.status != 200) {
      if (!(resp instanceof Blob)) {
        errorHandle(resp.status, resp);
        return Promise.reject(resp);
      }
    }
    return resp;
  },
  (err) => {
    hideLoading();
    if (err.message.includes("timeout")) {
      Message.error("请求超时");
      return Promise.reject(err.message);
    }
    if (err.response.status === 401) {
      Message.error("请登录后重试");
      cookie.removeCookies(COOKIE_TOKEN_KEY);
      window.location.reload();
      return;
    }
    errorHandle(err.response.status, err.response);
    return Promise.reject(err.message);
  }
);

$http.interceptors.request.use(
  (config) => {
    !config.hideLoading && showLoading();
    return config;
  },
  (error) => {
    hideLoading();
    console.log("request error", error);
  }
);

/**
 * 非500的后台错误有 error 和 errors 两种，需分别处理
 * @param {string} error
 * @param {{ key: [string, ...] }} errors
 * @param {*} resp
 * @returns string
 */
const formatErrMsg = (resp) => {
  let result = "";

  if (resp.data.error) {
    result += `${resp.data.error} ; \n`;
  }

  if (resp.data.errors) {
    for (const i in resp.data.errors) {
      result += `${resp.data.errors[i]} ; \n`;
    }
  }

  return result;
};

export default BaseApi;
