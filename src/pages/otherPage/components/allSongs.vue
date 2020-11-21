<template>
  <view class="content">
    <view class="hear-loading" v-if="isLoading">
      <heartLoading />
    </view>
    <view class="flex" style="margin-bottom: 20rpx; align-items: center">
      <image src="/static/play/all_play.png" class="all_play" />
      <view class="play_all">播放全部</view>
    </view>
    <block v-for="(item, index) in allSearch.data" :key="index">
      <view
        class="songs_list flex"
        @tap.stop="
          handleNavTo({ url: '/pages/otherPage/playPage?id=' + item.id })
        "
      >
        <view class="songs_info">
          <view class="songs_name">{{ item.name }}</view>
          <view class="songs_auth"
            >{{ item.ar[0].name }} - {{ item.al.name }}</view
          >
        </view>
        <view class="flex1"></view>
        <view class="mv_play" v-if="item.mv">
          <image src="/static/search/mv_play.png" />
        </view>
        <view class="other_sopt"><image src="/static/search/spot.png" /></view>
      </view>
    </block>
    <graceLoading
      :loadingType="
        loading['search.cloudsearch'] ? 1 : allSearch.has_next_page ? 0 : 2
      "
    ></graceLoading>
  </view>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import heartLoading from "./heartLoading";
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
    ...mapActions("cloud/search", ["cloudSearch"]),
  },
  computed: {
    ...mapGetters("cloud/search", ["allSearch"]),
  },
  async created() {
    this.isLoading = true;
    await this.cloudSearch({
      keywords: this.searchKey,
      limit: 20,
      offset: 1,
    });
    this.isLoading = false;
    console.log(this.allSearch);
  },
};
</script>

<style>
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
.all_play {
  width: 40rpx;
  height: 40rpx;
}
.songs_title {
  font-size: 32rpx;
  font-weight: 600;
}
.play_all {
  font-size: 32rpx;
  padding: 0 12rpx;
}
.songs_list {
  width: 100%;
  height: 120rpx;
  /* background-color: #fff; */
  align-items: center;
}
.songs_info {
  width: 500rpx;
}
.songs_name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10rpx;
}
.songs_auth {
  font-size: 24rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mv_play {
  width: 60rpx;
  height: 60rpx;
  padding-top: 10rpx;
}
.mv_play image {
  width: 40rpx;
  height: 40rpx;
}
.other_sopt {
  width: 60rpx;
  height: 60rpx;
}
.other_sopt image {
  width: 60rpx;
  height: 60rpx;
}
.view_more {
  font-size: 24rpx;
  text-align: center;
  transform: scale(0.9);
  margin-top: 20rpx;
}
.view_more image {
  width: 30rpx;
  height: 30rpx;
  transform: translateY(6rpx);
}
</style>