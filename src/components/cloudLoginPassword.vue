<template>
  <form class="grace-form">
    <view class="grace-form-item" style="border-bottom:1rpx solid #dddddd;">
      <cloudIcon name="iconshouji" class="font-32"></cloudIcon>
      <view class="grace-form-body">
        <input
          type="text"
          v-model="form.username"
          class="grace-form-input
        font-28"
          :placeholder="$t('account.login.placeholder.username')"
          placeholder-style="color:#bbbbbb;"
        />
      </view>
    </view>
    <view class="grace-form-item">
      <cloudIcon name="iconmima" class="font-32"></cloudIcon>
      <view class="grace-form-body">
        <input
          type="password"
          v-model="form.password"
          class="grace-form-input font-28"
          :placeholder="$t('account.login.placeholder.password')"
          placeholder-style="color:#bbbbbb;"
        />
      </view>
    </view>
    <view class="grace-margin-top mt-40">
      <button
        v-if="loading['user.login']"
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    ...mapActions("user", ["login"]),
    async loginNow() {
      try {
        await this.validate(this.form, {
          username: {
            type: "string",
            required: true,
            message: this.$t("account.tips.loginname_not_null")
          },
          password: {
            type: "string",
            required: true,
            message: this.$t("account.tips.password_not_null")
          }
        });
        const data = await this.login(this.form);
        this.handleNavTo(this.$config.index);
      } catch (e) {
        this.handleError(e);
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
  width: 168rpx;
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
