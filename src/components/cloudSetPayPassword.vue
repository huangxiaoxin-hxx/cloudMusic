<template>
  <view class="grace-dialog-shade" v-if="show">
    <view class="grace-password-dialog" :style="{ width: width }">
      <view class="title grace-h4">{{ title }}</view>
      <view class="close-btn" @tap="close">
        <cloudIcon type="grace" name="icon-close3"></cloudIcon>
      </view>
      <view class="content">
        <view class="grace-padding">
          <slot name="content"></slot>

          <view class="set-data grace-flex grace-flex-center">
            <view class="input">
              <input
                :placeholder="$t('account.pay_password.title')"
                focus
                type="number"
                password
                v-model="password"
              />
              <input
                :placeholder="$t('account.pay_password.confirm')"
                type="number"
                password
                v-model="resPassword"
              />
            </view>
          </view>

          <view class="set-data cloud-btn">
            <button type="primary" class="grace-btn" @tap.stop="setSubmit">
              {{ $t("common.operate.determine") }}
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
var graceChecker = require("@/graceUI/jsTools/graceChecker.js");
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "85%"
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      password: "",
      resPassword: ""
    };
  },
  watch: {
    show() {
      this.reset();
    }
  },
  methods: {
    reset() {
      this.password = "";
      this.resPassword = "";
    },
    setSubmit() {
      const rule = [
        {
          name: "password",
          checkType: "notnull",
          checkRule: "",
          errorMsg: this.$t("account.tips.password_not_null")
        },
        {
          name: "resPassword",
          checkType: "notnull",
          checkRule: "",
          errorMsg: this.$t("account.tips.password_not_null")
        },
        {
          name: "password",
          checkType: "reg",
          checkRule: "^[0-9]{6,6}$",
          errorMsg: this.$t("account.tips.password_length", { length: 6 })
        },
        {
          name: "resPassword",
          checkType: "reg",
          checkRule: "^[0-9]{6,6}$",
          errorMsg: this.$t("account.tips.password_length", { length: 6 })
        },
        {
          name: "resPassword",
          checkType: "same",
          checkRule: this.password,
          errorMsg: this.$t("account.tips.password_not_same")
        }
      ];
      const checkData = {
        password: this.password,
        resPassword: this.resPassword
      };
      var checkRes = graceChecker.check(checkData, rule);
      if (checkRes) {
        this.$emit("keyboardDone", { password: this.password });
      } else {
        this.makeToast(graceChecker.error);
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.grace-dialog-shade {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
}
.grace-password-dialog {
  width: 85%;
  height: auto;
  background: #ffffff;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 10rpx;
}
.grace-password-dialog .title {
  line-height: 100rpx;
  height: 100rpx;
  text-align: center;
}
.grace-password-dialog .keyword {
  margin: 40rpx 0;
}
.grace-password-dialog .keyword {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}
.grace-password-dialog .keyword > .input {
  width: 95rpx;
  height: 95rpx;
  line-height: 95rpx;
  font-size: 38rpx;
  font-weight: 700;
  text-align: center;
  border: 1px solid #d5d6d8;
  border-right: 0;
  background: #ffffff;
}
.grace-password-dialog .keyword > .input:last-child {
  border-right: 1px solid #d5d6d8;
}
.grace-password-dialog .content {
  width: 100%;
}
.grace-password-dialog .close-btn {
  position: absolute;
  z-index: 99;
  right: 36rpx;
  top: 32rpx;
  width: 28rpx;
  height: 28rpx;
  color: #cdcdcd;
}
.grace-password-dialog .btns {
  width: 100%;
}

.set-data {
  padding: 0rpx 80rpx 20rpx 80rpx;
}
.set-data .input {
  width: 100%;
}
.set-data .input input {
  height: 80rpx;
  line-height: 80rpx;
  border: 1rpx solid #999999;
  padding: 0rpx 20rpx;
  margin: 20rpx 0rpx;
  border-radius: 10rpx;
}

.cloud-btn {
  margin: 0 auto 30rpx;
}
</style>
