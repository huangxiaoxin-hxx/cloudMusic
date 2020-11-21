<template>
  <form class="grace-form">
    <view class="grace-form-item" style="border-bottom:1rpx solid #dddddd;">
      <cloudIcon name="iconshouji" class="font-32"></cloudIcon>
      <view class="grace-pnper ml-20">
        <picker
          :value="pnpre"
          @change="changePre"
          :range="pnpres"
          name="pn_pre"
          style="text-align:left;color:#999999;"
        >
          <view style="display:flex;">
            <text class="grace-text font-28">+{{ pnpres[pnpre] }}</text>
            <text
              class="grace-text grace-icons icon-arrow-down"
              style="margin-left:10rpx;font-size:32rpx;"
            ></text>
          </view>
        </picker>
      </view>
      <view class="grace-form-body">
        <input
          type="number"
          v-model="form.mobile"
          class="grace-form-input font-28"
          placeholder-style="color:#bbbbbb;"
          name="mobile"
          :placeholder="$t('account.login.placeholder.mobile')"
        />
      </view>
    </view>
    <view class="grace-form-item">
      <cloudIcon name="iconmima" class="font-32"></cloudIcon>
      <view class="grace-form-body">
        <input
          type="number"
          class="grace-form-input font-28"
          placeholder-style="color:#bbbbbb;"
          name="code"
          v-model="form.code"
          :placeholder="$t('account.common.placeholder.captcha')"
        />
      </view>
      <cloudSendCode
        style="flex-shrink: 0"
        v-model="form.mobile"
        type="mobile_login"
      >
      </cloudSendCode>
    </view>
    <view class="grace-margin-top mt-40">
      <button
        v-if="loading['user.mobile.login']"
        type="default"
        class="grace-button grace-border-radius font-36"
        style="color:#fff;"
        :loading="true"
      >
        {{ $t("account.login.logging") }}
      </button>
      <button
        v-else
        @tap.stop="loginNow"
        type="primary"
        class="grace-button grace-border-radius font-36"
      >
        {{ $t("account.login.title") }}
      </button>
    </view>
  </form>
</template>

<script>
const graceChecker = require("@/graceUI/jsTools/graceChecker.js");
import { mapActions } from "vuex";
export default {
  data() {
    return {
      pnpre: 0,
      pnpres: ["86"],
      countNum: 120,
      countDownTimer: null,
      form: {
        mobile: "",
        code: ""
      }
    };
  },

  methods: {
    ...mapActions("user", ["mobileLogin"]),
    loginWithWx: function() {
      uni.showToast({
        title: "请完善登录功能",
        icon: "none"
      });
    },
    changePre: function(e) {
      this.pnpre = e.detail.value;
    },
    loginNow: async function(e) {
      // 表单验证
      var rule = [
        {
          name: "mobile",
          checkType: "phoneno",
          errorMsg: this.$t("account.tips.mobile_not_right")
        },
        {
          name: "code",
          checkType: "string",
          checkRule: "4,6",
          errorMsg: this.$t("account.tips.captcha_length")
        }
      ];

      var checkRes = graceChecker.check(this.form, rule);
      // 验证通过
      if (checkRes) {
        await this.mobileLogin(this.form);
        this.handleNavTo(this.$config.index);
      } else {
        uni.showToast({ title: graceChecker.error, icon: "none" });
      }
    }
  }
};
</script>

<style scoped>
.iconfont {
  color: #999999;
}
.grace-button {
  border-radius: 10rpx;
  letter-spacing: 4rpx;
}
.grace-form-label {
  height: 80rpx;
  line-height: 80rpx;
}
.grace-pnper {
  width: 100rpx;
  flex-shrink: 0;
}
.grace-form-label {
  width: 60rpx;
}
.grace-form-input {
  text-align: left;
}
.grace-form-item {
  padding: 20rpx 0;
}
</style>
