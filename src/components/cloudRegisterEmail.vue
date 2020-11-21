<template>
  <form @submit="registNow" class="grace-form">
    <view class="grace-form-item grace-border-b">
      <cloudIcon name="iconyouxiang"></cloudIcon>
      <view class="grace-form-body">
        <input
          type="text"
          v-model="email"
          placeholder-style="color:#BBBBBB;"
          class="grace-form-input font-28"
          name="email"
          :placeholder="$t('account.common.placeholder.email')"
        />
      </view>
    </view>
    <view class="grace-form-item grace-border-b">
      <cloudIcon name="iconyanzhengma" style="font-size: 34rpx;"></cloudIcon>
      <view class="grace-form-body">
        <input
          type="number"
          placeholder-style="color:#BBBBBB;"
          class="grace-form-input font-28"
          name="code"
          :placeholder="$t('account.common.placeholder.captcha')"
        />
      </view>
      <cloudSendCode
        style="flex-shrink: 0;"
        v-model="email"
        type="email_register"
        category="email"
      >
      </cloudSendCode>
    </view>
    <view class="grace-form-item grace-border-b">
      <cloudIcon name="iconmima"></cloudIcon>
      <view class="grace-form-body">
        <input
          type="password"
          placeholder-style="color:#BBBBBB;"
          class="grace-form-input font-28"
          name="password"
          :placeholder="$t('account.register.placeholder.password')"
        />
      </view>
    </view>
    <view class="grace-form-item grace-border-b">
      <cloudIcon name="iconmima"></cloudIcon>
      <view class="grace-form-body">
        <input
          type="password"
          placeholder-style="color:#BBBBBB;"
          class="grace-form-input font-28"
          name="password_confirmation"
          :placeholder="$t('account.register.placeholder.confim')"
        />
      </view>
    </view>
    <view class="grace-form-item">
      <cloudIcon name="iconyaoqingma"></cloudIcon>
      <view class="grace-form-body">
        <input
          type="text"
          placeholder-style="color:#BBBBBB;"
          class="grace-form-input font-28"
          name="invite_code"
          :placeholder="$t('account.register.placeholder.invite')"
        />
      </view>
    </view>
    <!-- <view class="grace-form-item">
            <cloudIcon name="iconanzhiren"></cloudIcon>
            <view class="grace-form-body">
              <input type="number"
                     placeholder-style="color:#BBBBBB;"
                     class="grace-form-input font-28"
                     name="yzm"
                     placeholder="请输入安置人" />
            </view>
          </view> -->
    <view class="grace-margin-top">
      <button
        form-type="submit"
        type="primary"
        class="grace-button grace-border-radius font-36"
        :loading="loading['user.email.register']"
      >
        {{ $t("account.register.title") }}
      </button>
    </view>
  </form>
</template>

<script>
import { mapActions } from "vuex";
const graceChecker = require("@/graceUI/jsTools/graceChecker.js");

export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    ...mapActions("user", ["emailRegister"]),
    async registNow(e) {
      // 表单验证
      const rule = [
        {
          name: "email",
          checkType: "email",
          errorMsg: this.$t("account.tips.mail_not_right")
        },
        {
          name: "password",
          checkType: "string",
          checkRule: "8,",
          errorMsg: this.$t("account.tips.password_length", { length: 8 })
        },
        {
          name: "password_confirmation",
          checkType: "samewith",
          checkRule: "password",
          errorMsg: this.$t("account.tips.password_not_same")
        },
        {
          name: "code",
          checkType: "string",
          checkRule: "4,6",
          errorMsg: this.$t("account.tips.captcha_length")
        }
      ];
      const formData = e.detail.value;
      const checkRes = graceChecker.check(formData, rule);
      // 验证通过
      if (!checkRes) {
        this.makeToast({ title: graceChecker.error, icon: "none" });
        return;
      }

      delete formData.password_confirmation;
      await this.emailRegister(formData);
      this.makeToast(this.$t("account.tips.register_success"));
      setTimeout(() => {
        this.handleNavLogin();
      }, 1000);
    }
  }
};
</script>

<style scoped>
.iconfont {
  color: #999999;
}
.grace-form-label {
  width: 168rpx;
}
.grace-form-input {
  text-align: left;
}
.grace-form-item {
  padding: 20rpx 0;
}
</style>
