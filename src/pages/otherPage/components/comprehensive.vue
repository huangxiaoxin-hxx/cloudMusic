<template>
  <view class="content">
    <view class="hear-loading" v-if="isLoading">
      <heartLoading />
    </view>
    <view class="flex" style="margin-bottom: 30rpx">
      <view class="flex1 songs_title">单曲</view>
      <view class="play_all">播放全部</view>
    </view>
    <block v-for="(item, index) in result && result.songs" :key="index">
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
    <view class="view_more" @tap.stop="viewMore"
      >查看全部{{ result && result.songCount }}首歌曲
      <image src="/static/right_arrow.png" />
    </view>
    <view class="flex" style="margin-bottom: 30rpx">
      <view class="flex1 songs_title">歌单</view>
    </view>
    <block v-for="sheet in sheets && sheets.playlists" :key="sheet.id">
      <view class="sheet_list flex" @tap.stop="goSheetDetail(sheet.id)">
        <image :src="sheet.coverImgUrl" />
        <view class="flex1">
          <view class="sheet_name">{{ sheet.name }}</view>
          <view class="sheet_info"
            >{{ sheet.trackCount }}首 by {{ sheet.creator.nickname }}，播放{{
              parseFloat(sheet.playCount / 10000).toFixed(1)
            }}万次</view
          >
        </view>
      </view>
    </block>
    <view class="view_more_sheet" @tap.stop="viewMoreSheet"
      >查看更多 <text style="color: #637eb0">{{ searchKey }}</text> 歌单
      <image src="/static/right_arrow.png" />
    </view>
  </view>
</template>

<script>
import { mapActions } from "vuex";
import heartLoading from "./heartLoading";
export default {
  data() {
    return {
      isLoading: true,
      result: null,
      sheets: null,
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
    ...mapActions("cloud/search", ["cloudSearch", "searchSheet"]),
    viewMore() {
      this.$emit("moreSong");
    },
    viewMoreSheet() {
      this.$emit("moreSheet");
    },
    goSheetDetail(id) {
      this.handleNavTo({ url: "/pages/otherPage/sheetDetail?id=" + id });
    },
  },
  async created() {
    this.isLoading = true;
    this.result = await this.cloudSearch({
      keywords: this.searchKey,
      limit: 5,
    });
    // 不知道为啥有些歌手少歌
    if (this.result.songs.length < 5) {
      this.result = await this.cloudSearch({
        keywords: this.searchKey,
        limit: 10,
      });
    }
    this.sheets = await this.searchSheet({
      keywords: this.searchKey,
      limit: 5,
    });
    this.isLoading = false;
    console.log(this.isLoading);
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
.songs_title {
  font-size: 32rpx;
  font-weight: 600;
}
.play_all {
  font-size: 24rpx;
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
  margin-bottom: 40rpx;
}
.view_more image {
  width: 30rpx;
  height: 30rpx;
  transform: translateY(6rpx);
}
.sheet_list {
  width: 100%;
  height: 160rpx;
  margin-bottom: 20rpx;
  align-items: center;
}
.sheet_list image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}
.sheet_name {
  width: 100%;
  font-size: 28rpx;
  color: #fff;
  font-weight: 600;
  margin-bottom: 20rpx;
}
.sheet_info {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  transform: scale(0.8) translateX(-60rpx);
}
.view_more_sheet {
  font-size: 24rpx;
  text-align: center;
  transform: scale(0.9);
  margin-top: 60rpx;
  margin-bottom: 40rpx;
}
.view_more_sheet image {
  width: 30rpx;
  height: 30rpx;
  transform: translateY(6rpx);
}
</style>