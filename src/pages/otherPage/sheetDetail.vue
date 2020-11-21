<template>
  <cloudPage>
    <cloudHeader slot="gHeader" background="rgba(0,0,0,0)">
      <view class="grace-header-body">
        <!-- 返回按钮 -->
        <view
          class="grace-header-icons grace-icons"
          style="margin-right: 10rpx"
          @tap.stop="handleNavBack"
        >
          <image src="/static/back.png" class="back-icon" />
        </view>
        <!-- 中间内容 -->
        <view
          class="grace-header-content-noflex grace-text-left"
          style="font-size: 32rpx"
        >
          歌单
        </view>
        <!-- 右侧按钮 -->
        <view class="" style="width: 40rpx"></view>
      </view>
    </cloudHeader>
    <view
      class="bgmask"
      v-if="!isLoading"
      :style="{
        backgroundImage: 'url(' + detail.playlist.coverImgUrl + ')',
      }"
    ></view>
    <view class="hear-loading" v-if="isLoading">
      <heartLoading />
    </view>
    <view class="container" v-if="!isLoading">
      <!-- 歌单信息 -->
      <view class="sheet_info flex">
        <image :src="detail.playlist.coverImgUrl" />
        <view class="flex1">
          <view class="sheet_name">{{ detail.playlist.name }}</view>
          <view class="creator_info flex">
            <image :src="detail.playlist.creator.avatarUrl" mode="" />
            <view class="creator_name">{{
              detail.playlist.creator.nickname
            }}</view>
            <image src="/static/right_arrow.png" class="right_arrow" />
          </view>
          <view class="sheet_explian">
            <view
              class="sheet_explian_text"
              v-if="detail.playlist.description"
              >{{ detail.playlist.description }}</view
            >
            <view class="sheet_explian_text" v-else>介绍：无</view>
            <image src="/static/right_arrow.png" class="right_arrow" />
          </view>
        </view>
      </view>
      <!-- 歌单列表 -->
      <view class="sheet_detail_list">
        <view class="flex sheet_detail_list_top">
          <image src="/static/play/all_play.png" class="all_play_img" />
          <view class="all_play_text flex1"
            >播放全部
            <text style="font-size: 24rpx; color: rgba(255, 255, 255, 0.8)"
              >(共{{ detail.playlist.trackCount }}首)</text
            >
          </view>
          <view class="add_collection"
            >+ 收藏 ({{ detail.playlist.subscribedCount }})</view
          >
        </view>
        <!-- 滚动歌单列表 -->
        <scroll-view scroll-y="true" class="scroll-Y">
          <block v-for="(song, index) in songs" :key="song.id">
            <view
              class="song_box flex"
              @tap.stop="
                handleNavTo({ url: '/pages/otherPage/playPage?id=' + song.id })
              "
            >
              <view class="rank_num">{{ index + 1 }}</view>
              <view class="flex1">
                <view class="song_name">{{ song.name }}</view>
                <view class="flex song_ar_al">
                  <view class="song_ar">
                    <block v-for="(article, index2) in song.ar" :key="index2">
                      <text
                        >{{ article.name
                        }}{{ song.ar.length - 1 == index2 ? "" : "/" }}</text
                      >
                    </block>
                  </view>
                  <view class="song_al">-{{ song.al.name }}</view>
                </view>
              </view>
            </view>
          </block>
        </scroll-view>
      </view>
    </view>
  </cloudPage>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import heartLoading from "./components/heartLoading";
export default {
  components: {
    heartLoading,
  },
  data() {
    return {
      detail: null,
      isLoading: true,
      songs: [],
    };
  },
  async onLoad(option) {
    this.isLoading = true;
    // console.log(option.id);
    this.detail = await this.getSheetDetail({
      id: option.id,
    });
    let ids = this.trackIds(this.detail.playlist.trackIds);
    this.songs = await this.getSheetAllSong({ ids: ids });
    this.isLoading = false;
  },
  methods: {
    ...mapActions("cloud/search", ["getSheetDetail", "getSheetAllSong"]),
    // 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail
    // 处理trackIds数据
    trackIds(trackArr) {
      let str = null;
      let ids = [];
      // console.log(trackArr);
      trackArr.map((item) => {
        ids.push(item.id);
      });
      str = ids.join();
      return str;
    },
  },
  computed: {},
};
</script>

<style>
.abnf {
  text-align: left;
}
.hear-loading {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(0.3);
  z-index: 100;
}
.bgmask {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-size: 100% 100%;
  filter: blur(30px);
}
.container {
  width: 100%;
  padding: 60rpx 0 0;
  box-sizing: border-box;
  z-index: 100;
  color: #fff;
}
.sheet_info {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20rpx;
  /* align-items: center; */
}
.sheet_info image {
  width: 240rpx;
  height: 240rpx;
  border-radius: 10rpx;
  margin-right: 30rpx;
}
.sheet_name {
  font-size: 34rpx;
  font-weight: 600rpx;
  margin-bottom: 10rpx;
  width: 400rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.creator_info {
  align-items: center;
  margin-bottom: 70rpx;
}
.creator_info image {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}
.creator_name {
  font-weight: 400;
  font-size: 28rpx;
}
.creator_info .right_arrow {
  height: 30rpx;
  width: 30rpx;
}
.sheet_explian .right_arrow {
  height: 30rpx;
  width: 30rpx;
}
.sheet_explian {
  font-size: 24rpx;
  transform: scale(0.9) translateX(-20rpx);
  align-items: center;
}
.sheet_explian_text {
  font-size: 24rpx;
  max-width: 360rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.sheet_detail_list {
  position: absolute;
  top: 500rpx;
  bottom: 0;
  background-color: #060708;
  width: 100%;
  border-radius: 30rpx 30rpx 0 0;
  box-sizing: border-box;
  padding: 0 32rpx;
}
.sheet_detail_list_top {
  height: 100rpx;
  align-items: center;
  width: 100%;
}
.all_play_img {
  width: 50rpx;
  height: 50rpx;
  margin-right: 20rpx;
}
.add_collection {
  background-color: #e1433b;
  min-width: 200rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  height: 100rpx;
  border-radius: 50rpx;
  transform: translateX(20rpx);
  text-align: center;
  line-height: 100rpx;
}
.scroll-Y {
  width: 100%;
  position: absolute;
  top: 100rpx;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0 20rpx;
}
.song_box {
  width: 100%;
  height: 120rpx;
  align-items: center;
}
.rank_num {
  width: 70rpx;
  height: 120rpx;
  line-height: 120rpx;
  font-size: 36rpx;
  font-weight: 300;
  color: #9b9c9d;
  text-align: center;
  margin-right: 20rpx;
}
.song_name {
  margin-bottom: 6rpx;
}
.song_ar_al {
  transform: scale(0.8) translateX(-80rpx);
  color: #9b9c9d;
}
.song_ar {
  font-size: 26rpx;
}
.song_al {
  font-size: 26rpx;
}
</style>