<template>
  <view>
    <view
      class="grace-btdialog-shade"
      v-if="show"
      @tap.stop="closeDialog"
      @touchmove.prevent.stop="stopFun"
    >
      <view
        :class="['dialog', 'gdIn', isIpx ? 'grace-ipx-bottom' : '']"
        @tap.stop="stopFun"
      >
        <view class="content" @tap.stop="stopFun">
          <view
            class="shareSwiper grace-flex grace-flex-vcenter"
            :style="{ height: swiperHeight + 'px' }"
          >
            <view class="prve grace-text-center" @tap.stop="sharePive">
              <image src="/static/share/pive.png" />
            </view>
            <view class="grace-relative">
              <swiper
                class="swiper-list"
                :current="swiperCurrent"
                @change="onChange"
                style="height: 766rpx;"
              >
                <swiper-item v-for="(iamge, index) in shareImgs" :key="index">
                  <view class="grace-relative">
                    <image
                      :src="iamge"
                      style="width: 500rpx; height: 766rpx;"
                    />
                    <view class="qrcode">
                      <cloudQrcode
                        v-if="qrText != ''"
                        ref="qrcode"
                        :val="qrText"
                        :size="size"
                        :unit="unit"
                        :onval="onval"
                        :loadMake="loadMake"
                        :showLoading="true"
                        @result="qrR"
                      />
                      <image
                        src="/static/wallet/not_recharge.png"
                        v-else
                        style="width: 422rpx; height: 408rpx;"
                      />
                    </view>
                  </view>
                </swiper-item>
              </swiper>
              <canvas
                style="width: 500px; height: 766px; background: rgba(0,0,0,0); position: absolute; left: 0; top: 1000px;"
                canvas-id="poster"
              ></canvas>
              <view class="color-w grace-text-center font-22 mt-20">
                {{ $t("my.invite.swiperTips") }}
              </view>
            </view>
            <view class="next grace-text-center" @tap.stop="shareNext">
              <image src="/static/share/next.png" />
            </view>
          </view>

          <view class="grace-bg-white shareDialogSelect">
            <view class="font-26 weight-bold title mb-20">
              {{ $t("my.invite.shareTitle") }}
            </view>
            <view class="grace-grids four grace-flex-vcenter">
              <view class="items" @tap.stop="onTapSaveImgage">
                <view class="grace-flex-center">
                  <image src="/static/share/pic.png" class="image" />
                </view>
                <view class="grace-text-center font-24 color-b3 mt-15 mb-15">
                  {{ $t("my.invite.shareBtnPic") }}
                </view>
              </view>
              <view class="items" @tap.stop="onTapFriend">
                <view class="grace-flex-center">
                  <image src="/static/share/wx.png" class="image" />
                </view>
                <view class="grace-text-center font-24 color-b3 mt-15 mb-15">{{
                  $t("my.invite.wechatFriends")
                }}</view>
              </view>
              <view class="items" @tap.stop="onTapGroup">
                <view class="grace-flex-center">
                  <image src="/static/share/wx_group.png" class="image" />
                </view>
                <view class="grace-text-center font-24 color-b3 mt-15 mb-15">{{
                  $t("my.invite.friendsCircle")
                }}</view>
              </view>
              <view class="items" @tap.stop="onTapCopy">
                <view class="grace-flex-center">
                  <image src="/static/share/link.png" class="image" />
                </view>
                <view class="grace-text-center font-24 color-b3 mt-15 mb-15">
                  {{ $t("my.invite.shareBtnLink") }}
                </view>
              </view>
            </view>
            <view class="close" @tap.stop="closeDialog">
              {{ $t("my.invite.close") }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    shareImgs: {
      type: Array
    },
    shareHost: {
      type: String,
      default: ""
    },
    shareCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isIpx: false,
      swiperHeight: 0,
      swiperCurrent: 0,

      size: 120, // 二维码大小
      unit: "upx", // 单位
      qrText: "",
      onval: true, // val值变化时自动重新生成二维码
      loadMake: true, // 组件加载完成后自动生成二维码
      src: "" // 二维码生成后的图片地址或base64
    };
  },
  computed: {
    ...mapGetters({ currentLocale: "system/locale" })
  },
  created() {
    uni.getSystemInfo({
      success: res => {
        // #ifdef MP
        var model = res.model;
        if (model.search("iPhone X") != -1) {
          this.isIpx = true;
        }
        // #endif

        this.swiperHeight =
          res.screenHeight - res.statusBarHeight - 44 - uni.upx2px(340);
      }
    });
    this.qrText =
      this.shareHost +
      "?code=" +
      this.shareCode +
      "&locale=" +
      this.currentLocale;
  },
  watch: {
    shareHost() {
      this.qrText = this.shareHost + "?code=" + this.shareCode;
      "&locale=" + this.currentLocale;
    },
    shareCode() {
      this.qrText = this.shareHost + "?code=" + this.shareCode;
      "&locale=" + this.currentLocale;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    stopFun() {},

    qrR: function(imgSrc) {
      this.src = imgSrc;
    },

    sharePive() {
      if (this.swiperCurrent == 0) {
        return;
      }
      this.swiperCurrent--;
    },
    onChange: function(e) {
      this.swiperCurrent = e.detail.current;
    },
    shareNext() {
      if (this.swiperCurrent + 1 == this.shareImgs.length) {
        return;
      }
      this.swiperCurrent++;
    },

    onTapSaveImgage() {
      uni.showLoading({ title: this.$t("common.tips.saving"), mask: true });
      let ctx = uni.createCanvasContext("poster");
      uni.getImageInfo({
        src: this.shareImgs[this.swiperCurrent],
        success: res => {
          ctx.drawImage(res.path, 0, 0, 500, 766);
          ctx.save();

          ctx.beginPath();
          ctx.setFillStyle("#FFFFFF");
          ctx.fillRect(365, 617, 120, 120);

          ctx.beginPath();
          ctx.drawImage(this.src, 375, 627, 100, 100);

          ctx.draw(false, () => {
            uni.canvasToTempFilePath({
              canvasId: "poster",
              width: 500,
              height: 766,
              success: res => {
                uni.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: () => {
                    this.makeToast(this.$t("my.invite.savePidTips"));
                  },
                  complete: () => {
                    uni.hideLoading();
                  }
                });
              }
            });
          });
        }
      });
    },
    onTapFriend() {
      this.makeToast("未启用");
    },
    onTapGroup() {
      this.makeToast("未启用");
    },
    onTapCopy() {
      this.handleCopy({ content: this.shareHost + "?code=" + this.shareCode });
    }
  }
};
</script>
<style>
@keyframes gdIn {
  from {
    bottom: -100px;
  }

  100% {
    opacity: 0px;
  }
}

.gdIn {
  animation: fadeIn 200ms linear;
}

.grace-btdialog-shade {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
}

.grace-btdialog-shade .dialog {
  width: 700rpx;
  height: auto;
  border-radius: 20rpx;
  position: absolute;
  bottom: 20rpx;
  left: 25rpx;
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

.shareSwiper {
  width: 100%;
}

.shareSwiper .prve,
.shareSwiper .next {
  width: 100rpx;
}

.shareSwiper .prve image,
.shareSwiper .next image {
  width: 36rpx;
  height: 36rpx;
}

.shareSwiper .swiper-list {
  width: 500rpx;
}

.shareSwiper .qrcode {
  position: absolute;
  width: 120upx;
  height: 120upx;
  top: 607upx;
  left: 355upx;
  background: #ffffff;
  padding: 4upx;
}

.shareSwiper .qrcode image {
  width: 100rpx !important;
  height: 100rpx !important;
  margin-left: 10rpx;
  margin-top: 10rpx;
}

.shareDialogSelect {
  border-radius: 20rpx;
}

.shareDialogSelect .title {
  padding: 30rpx 40rpx 10rpx 40rpx;
}

.close {
  line-height: 80rpx;
  border-top: 1rpx dashed #999999;
  text-align: center;
}

.four > .items {
  flex: 1;
}

.items .image {
  width: 90rpx;
  height: 90rpx;
}
</style>
