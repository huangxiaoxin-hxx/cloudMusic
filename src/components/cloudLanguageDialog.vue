<template>
  <view>
    <graceBottomDialog :show="show" v-on:closeDialog="closeDialog">
      <view class="grace-space-between" slot="btns">
        <view class="grace-dialog-buttons" @tap="closeDialog">{{ $t("common.operate.cancel") }}</view>
        <view
          class="grace-dialog-buttons"
          style="color:#00B26A;"
          @tap="closeDialog"
        >{{ $t("common.operate.determine") }}</view>
      </view>
      <view slot="content">
        <view class="grace-form select-lang">
          <view
            class="grace-form-item"
            v-for="(locale, index) in locales"
            :key="index"
            @tap.stop="onTapSwitchLang(locale.value)"
          >
            <view class="grace-form-label">{{ locale.title }}</view>
            <view class="grace-form-input">
              <radio class="radiobox" color="#343A45" :checked="currentLocale == locale.value"></radio>
            </view>
          </view>
        </view>
      </view>
    </graceBottomDialog>
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("system", ["locales"]),
    ...mapGetters({ currentLocale: "system/locale" })
  },
  methods: {
    ...mapActions("system", ["switchLocale"]),
    closeDialog() {
      this.$emit("closeDialog");
    },
    onTapSwitchLang(locale) {
      this.switchLocale({ locale });
    }
  }
};
</script>

<style scoped>
.save {
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.select-lang {
  width: 710rpx;
  padding: 20rpx;
}
</style>
