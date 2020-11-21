import { getStorage, setStorage, removeStorage } from "@/utils";
import { $i18n } from "../../boot/i18n";

export default function init($store) {
  // 用户登录token监控 (初始化本地存储的token, 并实时监控变动)
  // $store.watch(
  //   state => state.user.accessToken,
  //   (newVal, val) => {
  //     if (newVal) {
  //       // 记录用户token 到本地存储中
  //       const storedAccessToken = getStorage("access_token");
  //       if (newVal != storedAccessToken) {
  //         setStorage("access_token", newVal);
  //       }
  //     } else {
  //       // 空值代表清空
  //       removeStorage("access_token");
  //     }
  //   }
  // );
  // $store.commit("user/setAccessToken", getStorage("access_token")); // 初始登录的值

  // 默认语言
  // $store.watch(
  //   state => state.system.locale,
  //   (newVal, val) => {
  //     if (newVal) {
  //       // 记录用户token 到本地存储中
  //       const locale = getStorage("locale");
  //       $i18n.locale = newVal;
  //       if (newVal != locale) {
  //         setStorage("locale", newVal);
  //       }
  //     } else {
  //       // 空值代表清空
  //       removeStorage("locale");
  //     }
  //   }
  // );
  // $store.commit("system/setLocale", getStorage("locale")); // 初始登录的值

  // 全局监控toast, 并响应
  // TODO 界面层面的操作应当放入组件中实现?(组件中监控有优先级的问题, 目前这是最高优先级)
  $store.watch(
    state => state.toast,

    (newVal, val) => {
      if (newVal) {
        uni.showToast({
          title: "未知错误",
          duration: 1500,
          mask: true,
          position: "center",
          icon: "none",
          ...newVal
        });
      }
    }
  );
}
