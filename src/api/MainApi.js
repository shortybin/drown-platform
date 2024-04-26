import BaseApi from "./BaseApi";

class MainApi extends BaseApi {
  createFence(params) {
    return this.post("fence/create", params);
  }

  getFenceList(params) {
    return this.post("fence/query_list", params);
  }

  deleteFence(params) {
    return this.post("fence/delete", params);
  }
}

export default new MainApi();
