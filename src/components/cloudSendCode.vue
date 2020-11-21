<template>
  <view class="">
    <button
      type="primary"
      class="grace-button"
      size="mini"
      v-if="show"
      @tap.stop="sendCode"
    >
      {{ $t("common.operate.get_captcha") }}
    </button>
    <button v-else type="default" class="grace-button" size="mini">
      {{ $t("common.operate.captcha_countdown", { second: countdown }) }}
    </button>
  </view>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    value: String,
    type: String,
    category: {
      type: String,
      default: "mobile"
    }
  },
  data() {
    return {
      countdown: 60,
      show: true
    };
  },
  methods: {
    ...mapActions("user", ["notifyMobile", "notifyEmail"]),
    async sendCode() {
      if (this.category == "mobile") {
        if (!this.isValidPhone()) {
          return;
        }

        await this.notifyMobile({
          mobile: this.value,
          type: this.type
        });
        this.makeToast(this.$t("common.tips.sms_sendsuccess"));
      } else if (this.category == "email") {
        if (!this.isValidEmail()) {
          return;
        }

        await this.notifyEmail({
          email: this.value,
          type: this.type
        });
        this.makeToast(this.$t("common.tips.mail_sendsuccess"));
      }

      this.countdownStart();
      this.show = false;
    },
    isValidPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.value)) {
        this.makeToast(this.$t("common.tips.phoneno_error"));
        return false;
      }
      return true;
    },
    isValidEmail() {
      if (
        !/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(
          this.value
        )
      ) {
        this.makeToast(this.$t("common.tips.mail_error"));
        return false;
      }
      return true;
    },
    countdownStart() {
      var interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown = this.countdown - 1;
        } else {
          clearInterval(interval);
          this.show = true;
          this.countdown = 60;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.grace-button {
  font-size: 24rpx !important;
  width: 218rpx;
  height: 55rpx;
  border-radius: 10rpx;
  line-height: 55rpx;
}
</style>
