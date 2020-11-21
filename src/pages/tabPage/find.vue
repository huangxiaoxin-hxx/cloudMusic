<template>
  <view class="content">
    <view class="bg-gray"></view>
    <swiper
      class="grace-swiper"
      autoplay="true"
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.5)"
      indicator-active-color="#c9434b"
      style="height: 240rpx"
      interval="3000"
      :circular="true"
    >
      <swiper-item
        class="grace-swiper-item"
        v-for="item in banner"
        :key="item.bannerId"
      >
        <!-- <navigator url="" class="grace-img-in"> -->
        <image class="swiper-image" mode="widthFix" :src="item.pic"></image>
        <!-- </navigator> -->
        <view class="title-icon" :class="item.titleColor">{{
          item.typeTitle
        }}</view>
      </swiper-item>
    </swiper>
    <view class="relative">
      <scroll-view class="scroll-X" scroll-x="true">
        <block>
          <view class="ball-icon" v-for="item in ball" :key="item.id">
            <view class="image-box">
              <image :src="item.iconUrl" class="icon-image" />
            </view>
            <view class="icon-title">{{ item.name }}</view>
          </view>
        </block>
      </scroll-view>
    </view>
    <!-- 推荐歌单 -->
    <view class="flex recommend_title">
      <view class="recommend_name flex1">人气歌单推荐</view>
      <view class="view_more">查看更多</view>
    </view>
    <view class="relative2">
      <scroll-view class="scroll-X" scroll-x="true">
        <block v-for="(item, index) in personalized" :key="index">
          <view class="recommend_content">
            <view
              class="recommend_box"
              :style="{ backgroundImage: `url('${item.picUrl}')` }"
            >
              <view class="play_number">
                <image src="/static/find/play.png" mode="" />
                <block v-if="item.playCount < 100000">{{
                  item.playCount
                }}</block>
                <block v-else>{{ parseInt(item.playCount / 10000) }}万</block>
              </view>
            </view>
            <view class="recommend_box_title">{{ item.name }}</view>
          </view>
        </block>
      </scroll-view>
    </view>
    <!-- 推荐新音乐 -->
    <view class="flex recommend_title">
      <view class="recommend_name flex1">新单推荐</view>
      <view class="play_all">
        <image src="/static/find/play.png" mode="" /> 播放全部</view
      >
    </view>
    <swiper
      class="new_songs_swiper"
      :indicator-dots="false"
      next-margin="60rpx"
    >
      <swiper-item v-for="(item, index) in newSongList" :key="index">
        <view class="new_songs_swiper_item">
          <block v-for="songs in item" :key="songs.id">
            <view class="new_songs_swiper_list flex">
              <image :src="songs.picUrl" />
              <view class="new_songs_title flex1">
                <view class="song_name flex">
                  <view class="song_title">{{ songs.name }}</view>
                  <view class="artists_name"
                    >-{{ songs.song.artists[0].name }}</view
                  >
                </view>
                <view class="songs_alias" v-if="songs.song.alias.length > 0">{{
                  songs.song.alias[0]
                }}</view>
              </view>
              <view class="play_button">
                <image src="/static/find/play_btn.png" mode="" />
              </view>
            </view>
          </block>
        </view>
      </swiper-item>
    </swiper>
    <view class="func"></view>
  </view>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("cloud/find", [
      "getBanner",
      "getFindPage",
      "getFindBall",
      "getPersonalized",
      "getNewSong",
    ]),
  },
  computed: {
    ...mapGetters("cloud/find", ["banner", "ball", "personalized", "newSongs"]),
    newSongList() {
      let songs = [];
      let index = 0;
      while (index < this.newSongs.length) {
        songs.push(this.newSongs.slice(index, (index += 3)));
      }
      return songs;
    },
  },
  async created() {
    await this.getBanner({ type: 1 });
    this.getFindPage();
    this.getFindBall();
    this.getPersonalized({ limit: 5 });
    await this.getNewSong({ limit: 9 });

    console.log(this.newSongList);
  },
};
</script>

<style scoped>
.relative {
  position: relative;
  width: 750rpx;
  left: -32rpx;
  min-height: 200rpx;
}
.relative2 {
  position: relative;
  width: 750rpx;
  left: -32rpx;
  min-height: 300rpx;
}
.func {
  margin-top: 400rpx;
}
.grace-swiper {
  width: 100%;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}
.grace-swiper-item {
  width: 100%;
  position: relative;
}
.swiper-image {
  width: 100%;
}
.bg-gray {
  width: 100%;
  background: #2c2c2c;
  position: absolute;
  height: 240rpx;
  top: -32rpx;
  left: 0;
}
.title-icon {
  position: absolute;
  width: 70rpx;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 24rpx;
  bottom: 0;
  right: 0;
  color: #fff;
  border-radius: 10rpx 0rpx 10rpx 0rpx;
  text-align: center;
}
.red {
  background-color: #d94a48;
}
.blue {
  background-color: #5588c5;
}
.scroll-X {
  width: 100%;
  box-sizing: border-box;
  padding: 10rpx 32rpx 0;
  white-space: nowrap;
  position: absolute;
  left: 0;
}
.ball-icon {
  width: 100rpx;
  height: 100rpx;
  display: inline-block;
  margin-right: 30rpx;
}
.ball-icon:last-child {
  margin-right: 0;
}
.image-box {
  width: 80rpx;
  height: 80rpx;
  background-color: #d94a48;
  border-radius: 50%;
  text-align: center;
  margin-bottom: 20rpx;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.icon-image {
  width: 80rpx;
  height: 80rpx;
}
.icon-title {
  font-size: 24rpx;
  text-align: center;
  color: #fff;
}
.recommend_title {
  height: 60rpx;
  width: 100%;
  margin-bottom: 20rpx;
}
.recommend_name {
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}
.view_more {
  border-radius: 50rpx;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0 12rpx;
  font-size: 24rpx;
  height: 40rpx;
  color: #fff;
  line-height: 40rpx;
  font-weight: 300;
}
.recommend_content {
  width: 200rpx;
  height: 300rpx;
  display: inline-block;
  margin-right: 20rpx;
}
.recommend_box {
  width: 200rpx;
  height: 200rpx;
  background-color: #fff;
  display: inline-block;
  border-radius: 10rpx;
  position: relative;
  background-size: 100% 100%;
  margin-bottom: 20rpx;
}
.recommend_box:last-child {
  margin-right: 0;
}
.recommend_box_title {
  width: 200rpx;
  /* height: 80rpx; */
  overflow: hidden;
  -webkit-box-orient: vertical;
  font-size: 24rpx;
  text-overflow: ellipsis;
  color: #fff;
  -webkit-line-clamp: 2;
}
.play_number {
  position: absolute;
  right: 0;
  color: #fff;
  font-weight: 600;
  height: 60rpx;
  font-size: 24rpx;
  align-items: center;
  top: 10rpx;
}
.play_number image {
  width: 20rpx;
  height: 20rpx;
  /* transform: translateY(10rpx); */
  margin-right: 10rpx;
}
.play_all {
  height: 40rpx;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0 12rpx;
  border-radius: 50rpx;
  color: #fff;
  font-weight: 300;
  font-size: 24rpx;
  line-height: 40rpx;
}
.play_all image {
  width: 20rpx;
  height: 20rpx;
  margin-right: 10rpx;
}
.new_songs_swiper {
  width: 100%;
  height: 360rpx;
  position: absolute;
}
.new_songs_swiper_item {
  width: 100%;
  height: 360rpx;
  box-sizing: border-box;
  /* border: 1px solid #fff; */
}
.new_songs_swiper_list {
  width: 100%;
  height: 120rpx;
  box-sizing: border-box;
}
.new_songs_swiper_list image {
  width: 100rpx;
  height: 100rpx;
  margin-top: 10rpx;
  border-radius: 10rpx;
}
.song_name {
  color: #fff;
  margin-top: 20rpx;
  box-sizing: border-box;
  margin-bottom: 10rpx;
  padding-left: 20rpx;
}
.song_title {
  max-width: 400rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artists_name {
  max-width: 100rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24rpx;
  line-height: 44rpx;
  transform: scale(0.8);
}
.songs_alias {
  box-sizing: border-box;
  font-size: 24rpx;
  color: #fff;
  max-width: 400rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform: scale(0.8) translateX(-24rpx);
}
.play_button {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  margin-right: 40rpx;
  border: 1px solid rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-top: 30rpx;
}
.play_button image {
  width: 26rpx;
  height: 26rpx;
  margin-top: 14rpx;
  margin-left: 6rpx;
}
</style>