<template>
  <view class="content">
    <view class="hear-loading" v-if="isLoading">
      <heartLoading />
    </view>
    <block v-for="(item, index) in allSheet.data" :key="index">
      <view
        class="sheet_box flex"
        @tap.stop="
          handleNavTo({ url: '/pages/otherPage/sheetDetail?id=' + item.id })
        "
      >
        <image :src="item.coverImgUrl" />
        <view class="flex1">
          <view class="sheet_name">{{ item.name }}</view>
          <view class="sheet_info"
            >{{ item.trackCount }}首 by {{ item.creator.nickname }}，播放{{
              parseFloat(item.playCount / 10000).toFixed(1)
            }}万次</view
          >
        </view>
      </view>
    </block>
    <graceLoading
      :loadingType="
        loading['search.search_sheet'] ? 1 : allSheet.has_next_page ? 0 : 2
      "
    ></graceLoading>
  </view>
</template>

<script>
import heartLoading from "./heartLoading";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
      result: null,
    };
  },
  components: {
    heartLoading,
  },
  props: {
    searchKey: {
      type: String,
      default: null,
    },
  },
  methods: {
    ...mapActions("cloud/search", ["searchSheet"]),
  },
  computed: {
    ...mapGetters("cloud/search", ["allSheet"]),
  },
  async created() {
    this.isLoading = true;
    await this.searchSheet({
      keywords: this.searchKey,
      limit: 20,
      offset: 1,
    });
    this.isLoading = false;
    console.log(this.allSheet);
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  color: #fff;
}
.hear-loading {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(0.3);
}
.sheet_box {
  width: 100%;
  height: 120rpx;
  margin-bottom: 20rpx;
}
.sheet_box image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}
.sheet_name {
  margin-top: 10rpx;
  width: 480rpx;
  font-size: 28rpx;
  color: #fff;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10rpx;
}
.sheet_info {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  transform: scale(0.8) translateX(-60rpx);
}
</style>