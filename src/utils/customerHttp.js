/* #ifdef MP-ALIPAY */
import Fly from "flyio/dist/npm/ap";
/* #endif */
/* #ifndef MP-ALIPAY */
import Fly from "flyio/dist/npm/wx";
/* #endif */
import qs from "qs";
import { $config } from "../config";

export const $http = new Fly();
$http.config.baseURL = $config.customerService.baseUrl;
$http.config.timeout = 10000;
$http.config.headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Accept: "application/json, text/javascript, */*; q=0.01",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  "X-Requested-With": "XMLHttpRequest"
};
//添加请求拦截器
$http.interceptors.request.use(request => {
  //打印出请求体
  console.log(request);
  request.body["business_id"] = $config.customerService.business_id;
  if (request.method == "POST") {
    request.body = qs.stringify(request.body);
  }

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
});
