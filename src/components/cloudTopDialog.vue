<template>
  <view>
    <view
      class="grace-btdialog-shade"
      v-if="show"
      @tap.stop="closeDialog"
      @touchmove.stop="stopFun"
    >
      <view :class="['dialog', isIpx ? 'grace-ipx-bottom' : '']" @tap.stop="stopFun">
        <view class="title">
          <slot name="btns"></slot>
        </view>
        <view class="content" @tap.stop="stopFun">
          <slot name="content"></slot>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isIpx: false
    };
  },
  // #ifdef MP
  created: function() {
    var _self = this;
    uni.getSystemInfo({
      success: function(res) {
        var model = res.model;
        if (model.search("iPhone X") != -1) {
          _self.isIpx = true;
        }
      }
    });
  },
  // #endif
  methods: {
    closeDialog: function() {
      this.$emit("closeDialog");
    },
    stopFun: function() {}
  }
};
</script>
<style>
.grace-btdialog-shade {
  position: fixed;
  width: 100%;
  height: calc(100% - 90rpx - var(--status-bar-height));
  left: 0;
  top: calc(90rpx + var(--status-bar-height));
  z-index: 9991;
  background: rgba(0, 0, 0, 0.7);
}
.grace-btdialog-shade .dialog {
  width: 100%;
  height: auto;
  background: #ffffff;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  position: absolute;
  top: 0;
  left: 0;
}
.grace-ipx-bottom {
  padding-bottom: 68rpx !important;
}
.grace-btdialog-shade .title {
  width: 100%;
}
.grace-btdialog-shade .content {
  width: 100%;
}
</style>
