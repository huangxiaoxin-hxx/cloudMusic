import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import "../utils/copy";
import { $config } from "../config";
import { validate } from "../utils";
import { handleError } from "./handler";

Vue.mixin({
  computed: {
    ...mapGetters(["loading"]),
    // ...mapGetters("user", ["hasLogined"]),

    // 全局配置
    $config: () => $config,
    // 全局音频
    innerAudioContext() {
      const innerAudioContext = uni.createInnerAudioContext();
      return innerAudioContext
    }
  },

  methods: {
    ...mapActions([
      "makeToast", // toast提示 (showToast已被被设定为关键字))
      "toggleLoading" // 切换loading状态
    ]),
    // 验证
    validate: validate,
    // 错误处理
    handleError: handleError,
    // 跳转封装
    handleNavTo({ url, type = "navigateTo", animation = true }) {
      uni[type]({
        url,
        ...(animation === true
          ? { animationType: "pop-in", animationDuration: 100 }
          : animation)
      });
    },
    makeLoading(options) {
      uni.showLoading(options);
    },
    handleNavLogin() {
      this.handleNavTo({
        url: "/pages/auth/login",
        type: "reLaunch"
      });
      // #ifdef H5
      location.reload(); // h5 reLanch不会消除tabbar
      // #endif
    },
    // 全局返回跳转
    handleNavBack({ animation = true } = {}) {
      uni.navigateBack({
        ...(animation === true
          ? { delta: 1, animationType: "pop-out", animationDuration: 100 }
          : animation)
      });
    },
    // 拷贝封装
    handleCopy({ content, successText = this.$t("common.tips.copyLinkTips") }) {
      uni.setClipboardData({
        data: content,
        success: () => {
          this.makeToast({
            title: successText
          });
        }
      });
    },
    //防抖
    debounce(fn, delay) {
      let timeout
      return function () {
        let self = this
        let args = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          fn.apply(self, args)
        }, delay)
      }
    }
  }
});
