<template>
  <!-- 启动广告 -->
  <view class="gui-start-banner" v-if="coverShow">
    <view class="gui-start-banner-skip" @tap.stop="closeStartBanner">跳过</view>
    <swiper
      class="gui-start-banner-swiper"
      :indicator-dots="true"
      indicator-active-color="#7BB830"
      indicator-color="rgba(0,0,0,0.3)"
      :autoplay="false"
      :style="{ height: startBannerHeight + 'px' }"
    >
      <!-- 启动图片建议纯色背景 此处设置 swiper-item 背景颜色与图片背景颜色相同即可实现全屏效果 -->
      <swiper-item style="background-color:#FFFFFF;" class="gui-start-banner-swiper-item">
        <image
          src="https://graceui.oss-cn-beijing.aliyuncs.com/startBanner/1.png"
          mode="widthFix"
          class="gui-start-banner-image"
        />
      </swiper-item>
      <swiper-item style="background-color:#FFFFFF;" class="gui-start-banner-swiper-item">
        <image
          src="https://graceui.oss-cn-beijing.aliyuncs.com/startBanner/2.png"
          mode="widthFix"
          class="gui-start-banner-image"
        />
      </swiper-item>
      <swiper-item style="background-color:#FFFFFF;" class="gui-start-banner-swiper-item">
        <image
          src="https://graceui.oss-cn-beijing.aliyuncs.com/startBanner/3.png"
          mode="widthFix"
          class="gui-start-banner-image"
        />
        <view class="gui-start-banner-close" @tap.stop="closeStartBanner">跳过</view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getStorage, setStorage } from "@/utils";
const graceSysInfo = require("@/graceUI/jsTools/systemInfo.js");

export default {
  props: {
    show: {
      type: Boolean,
      default() {
        return getStorage("cover_show", true);
      }
    }
  },
  data() {
    return {
      startBannerHeight: 500
    };
  },
  created() {
    if (!this.show) this.closeStartBanner();

    const system = graceSysInfo.info();
    this.startBannerHeight = system.windowHeight;
  },
  computed: {
    coverShow() {
      return this.show;
    }
  },
  watch: {
    show(newVal) {
      if (!newVal) this.closeStartBanner();
    }
  },
  methods: {
    closeStartBanner() {
      setStorage("cover_show", false);
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.gui-start-banner-skip {
  width: 100rpx;
  height: 50rpx;
  border-radius: 50rpx;
  text-align: center;
  border: 1px solid #999999;
  color: #999999;
  font-size: 22rpx;
  line-height: 50rpx;
  position: absolute;
  z-index: 9999;
  top: 80rpx;
  right: 50rpx;
}
.gui-start-banner {
  width: 100%;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  bottom: 0;
}
.gui-start-banner-swiper {
  width: 100%;
  height: 500rpx;
  background-color: #ffffff;
}
.gui-start-banner-swiper-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0;
}
.gui-start-banner-image {
  width: 100%;
}
.gui-start-banner-close {
  width: 220rpx;
  height: 80rpx;
  border-radius: 80rpx;
  margin-top: 80rpx;
  text-align: center;
  border: 1px solid #f97d7c;
  color: #f97d7c;
  font-size: 28rpx;
  line-height: 80rpx;
}
</style>