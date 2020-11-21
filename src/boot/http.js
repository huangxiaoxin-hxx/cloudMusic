/* #ifdef MP-ALIPAY */
import Fly from "flyio/dist/npm/ap";
/* #endif */
/* #ifndef MP-ALIPAY */
import Fly from "flyio/dist/npm/wx";
/* #endif */
import { $store } from "../store";
import { $config } from "../config";
import { handleError } from "./handler";

export const $http = new Fly();

$http.config.baseURL = $config.api.baseUrl;
$http.config.timeout = $config.api.timeout;
// 全局处理请求拦截
$http.interceptors.request.use(request => {
  // request.headers["Authorization"] = "Bearer " + $store.state.user.accessToken;
  // request.headers["Content-Language"] = $store.getters["system/locale"];
});

// 全局处理响应拦截
$http.interceptors.response.use(response => response, handleError);
