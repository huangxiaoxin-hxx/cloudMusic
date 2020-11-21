<template>
  <view class="grace-dialog-shade" v-if="show">
    <view class="grace-password-dialog" :style="{ width: width }">
      <view class="title grace-h4">
        {{ title || $t("account.pay_password.title") }}
      </view>
      <view class="close-btn" @tap="close">
        <cloudIcon type="grace" name="icon-close3"></cloudIcon>
      </view>
      <view class="content">
        <view class="grace-padding">
          <slot name="content"></slot>

          <view class="keyword">
            <view
              class="input grace-black"
              v-for="(code, index) in vcode"
              :key="index"
              >{{ code === "" ? "" : "*" }}</view
            >
          </view>
        </view>
      </view>
    </view>

    <view class="grace-keyboard">
      <view class="keys-left">
        <block v-for="(number, index) in numbers" :key="index">
          <view
            v-if="number === false"
            class="keys key-none"
            :hover-stay-time="100"
          ></view>
          <view
            v-else-if="number == 'delete'"
            @tap="remove"
            class="keys key-none graceNumberKeyboardFont-delete"
            hover-class="keydown"
            :hover-stay-time="100"
          >
            <!-- <icon-font name="icondelete"></icon-font> -->
            <cloudIcon type="grace" name="icon-back-delete"></cloudIcon>
          </view>
          <view
            v-else
            class="keys"
            :data-keynumber="number"
            hover-class="keydown"
            :hover-stay-time="100"
            @tap="inputNow"
            >{{ number }}</view
          >
        </block>
      </view>
    </view>
  </view>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import handler from "@/boot/handler";

export default {
  props: {
    value: {
      type: String,
      default: ""
    },
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
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, false, 0, "delete"],
      vValue: this.value || ""
    };
  },
  watch: {
    show() {
      this.reset();
    },
    value(newValue) {
      this.vValue = newValue;
    },
    async show(newValue) {
      if (newValue) {
        this.checkPayPasswordSet();
      }
    }
  },
  computed: {
    ...mapState("user", ["user"]),
    canInput() {
      return this.user && this.user.pay_password_set;
    },
    vcode() {
      const value = this.vValue;
      if (value.length > 0) {
        const code = value.split("");
        for (let i = 0; i < 6; i++) {
          if (code[i] === undefined) {
            code.push("");
          }
        }
        return code;
      } else if (value.length > 6) {
        return value.substr(0, 6).split("");
      }
      return ["", "", "", "", "", ""];
    }
  },
  methods: {
    ...mapMutations("user", ["setPayPasswordSetShow"]),
    ...mapActions("user", ["loadUser"]),
    async checkPayPasswordSet() {
      await this.loadUser();
      if (!this.user || !this.user.pay_password_set) {
        this.setPayPasswordSetShow(true);
        this.makeToast({
          title: this.$t("account.pay_password.tips.please_set_password")
        });
      }
    },
    reset() {
      this.changeValue("");
    },
    async inputNow(e) {
      await this.checkPayPasswordSet();
      const k = e.currentTarget.dataset.keynumber;

      const code = [...this.vcode];
      const length = code.length;
      let codeLength = 0;
      for (let i = 0; i < code.length; i++) {
        codeLength = i + 1;
        if (code[i] === "") {
          code.splice(i, 1, k);
          break;
        }
      }

      this.changeValue(code.join(""));

      this.$emit("keyboardInput", k);

      if (codeLength >= length) {
        setTimeout(() => {
          this.done();
        }, 500);
      }
    },
    remove() {
      const vcode = this.vcode;
      for (let i = vcode.length - 1; i >= 0; i--) {
        if (this.vcode[i] != "") {
          vcode.splice(i, 1, "");

          break;
        }
      }
      this.changeValue(vcode.join(""));
      setTimeout(() => {
        this.$emit("keyboardDelete");
      }, 100);
    },
    done() {
      this.$emit("keyboardDone", {
        password: this.vValue,
        original: this.vcode
      });
      this.vValue = "";
    },
    close() {
      this.$emit("close");
    },
    changeValue(value) {
      this.vValue = value;
      this.$emit("input", value);
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
.grace-keyboard {
  background: #f4f5f6;
  position: fixed;
  width: 100%;
  height: auto;
  left: 0;
  bottom: calc(var(--window-bottom));
  z-index: 999;
}
.grace-keyboard .keydown {
  background: #f3f3f3 !important;
  color: #ffffff !important;
}
.grace-keyboard .key-none {
  background: #edecec !important;
}
.grace-keyboard .keys-left {
  width: 750rpx;
  float: left;
}
.grace-keyboard .keys {
  width: 33.33%;
  height: 100rpx;
  float: left;
  background: #ffffff;
  text-align: center;
}
.grace-keyboard .keys,
.grace-keyboard .keys > .iconfont {
  line-height: 100rpx;
  font-weight: 500;
  font-size: 50rpx;
}
</style>
