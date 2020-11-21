import Vue from "vue";
import { $store } from "../store";
import { $i18n } from "../boot/i18n";

let lastError;
export function handleError(e, vm) {
  if (lastError == e) {
    // 重复错误不再处理
    return;
  } else {
    lastError = e;
  }
  if (process.env.NODE_ENV == "development") console.error(e);

  let message = $i18n.t("handler.server_error");
  if (e.errors) {
    //async-validate 错误
    message = e.errors[0].message || $i18n.t("handler.validation_error");
  } else if (e.message && !e.response) {
    // 逻辑错误
    message = e.message;
  } else if (e.status == 401) {
    message = $i18n.t("handler.need_login");
    // 未登录 跳转登录

    uni.reLaunch({
      url: "/pages/auth/login"
    });
    // #ifdef H5
    location.reload(); // h5 reLanch不会消除tabbar
    // #endif
  } else if (e.response && e.response.data.errors) {
    // 服务器返回validate错误
    const errors = Object.values(e.response.data.errors);
    message = errors[0][0] || $i18n.t("handler.validation_error");
  } else if (e.response && e.response.data.message) {
    // 服务器返回错误
    message = e.response.data.message || $i18n.t("handler.server_error");
  }

  $store.dispatch("makeToast", message);
}

Vue.config.errorHandler = handleError;
