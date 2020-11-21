<template>
  <cloudPage>
    <cloudHeader slot="gHeader" background="rgba(0,0,0,0)">
      <view class="grace-header-body">
        <!-- 返回按钮 -->
        <!-- 返回按钮 -->
        <view
          class="grace-header-icons grace-icons"
          style="margin-right: 10rpx"
          @tap.stop="handleNavBack"
        >
          <image src="/static/back.png" class="back-icon" />
        </view>
        <!-- 中间内容 -->
        <view class="grace-header-content-noflex grace-text-center">
          音乐播放
        </view>
        <!-- 右侧按钮 -->
        <view class="icons grace-icons"></view>
      </view>
    </cloudHeader>
    <view
      class="container"
      v-if="!isLoading"
      :style="{
        backgroundImage: 'url(' + nowSong.al.picUrl + ')',
      }"
    >
    </view>
    <view class="content">
      <view class="record" :class="isPlay ? 'turn_around' : ''">
        <image v-if="!isLoading" :src="nowSong.al.picUrl" mode="" />
      </view>
      <view class="bottom_paly_bar">
        <view class="top_box"></view>
        <view class="center_box">
          <view class="music_date">{{ musicCurrentTime }}</view>
          <view class="slider">
            <slider
              @touchstart="touchstart"
              :value="musicSlider"
              @change="sliderChange"
              @changing="sliderChanging"
              step="1"
              :block-size="12"
            />
          </view>
          <view class="music_date">{{ musicDuration }}</view>
        </view>
        <view class="bottom_box flex">
          <view class="flex1"
            ><image src="/static/play/xunhuan.png" class="small_icon"
          /></view>
          <view class="flex1"
            ><image src="/static/play/last.png" class="small_icon"
          /></view>
          <view class="play_pause" @tap.stop="playSong">
            <block v-if="isPlay"
              ><image src="/static/play/pause.png" class="pause_icon"
            /></block>
            <block v-else
              ><image src="/static/play/play.png" class="play_icon"
            /></block>
          </view>
          <view class="flex1"
            ><image src="/static/play/next.png" class="small_icon"
          /></view>
          <view class="flex1"
            ><image src="/static/play/play_list.png" class="small_icon"
          /></view>
        </view>
      </view>
    </view>
  </cloudPage>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
const innerAudioContext = uni.createInnerAudioContext();
export default {
  data() {
    return {
      music: null,
      isPlay: false,
      musicSlider: 0,
      musicMax: 0,
      musicNow: 0,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("cloud/search", ["getUrl"]),
    ...mapMutations("cloud/song", ["setSongId"]),
    ...mapActions("cloud/song", ["getNowSong", "addPlayList"]),
    // 暂停播放
    playSong() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        innerAudioContext.play();
      } else {
        innerAudioContext.pause();
      }
    },
    // 滑动进度条
    async sliderChange(e) {
      console.log(e);
      let val = e.detail.value;
      console.log(innerAudioContext.duration);
      innerAudioContext.currentTime = (val * innerAudioContext.duration) / 100;
      await innerAudioContext.play();
      this.isPlay = true;
    },
    sliderChanging() {
      innerAudioContext.pause();
      this.isPlay = false;
    },
    // 点击到slide时，暂停音乐
    touchstart() {
      innerAudioContext.pause();
      this.isPlay = false;
    },
  },
  computed: {
    ...mapState("cloud/song", ["songId"]),
    ...mapGetters("cloud/song", ["nowSong"]),
    musicDuration() {
      let time = parseInt(this.musicMax);
      let m = parseInt(time / 60);
      let s = parseInt(time % 60);
      return m + ":" + s;
    },
    musicCurrentTime() {
      let time = parseInt(this.musicNow);
      let m = parseInt(time / 60);
      let s = parseInt(time % 60);
      return m + ":" + s;
    },
  },
  async onLoad(option) {
    this.isLoading = true;
    // 请求歌曲url
    let data = await this.getUrl({ id: option.id });
    // 获取歌曲信息
    await this.getNowSong({ keywords: option.id });
    this.isLoading = false;
    console.log(this.nowSong);
    this.music = data[0];
    // 判断是否进入的同一首歌
    if (option.id == this.songId) {
      this.isPlay = true;
      return;
    }
    this.setSongId(option.id);
    innerAudioContext.autoplay = true;
    innerAudioContext.src = this.music.url;
    innerAudioContext.onPlay(() => {
      this.isPlay = true;
      console.log("开始播放");
      console.log(innerAudioContext.duration);
      this.musicMax = innerAudioContext.duration;
      // 开始播放就加入歌单
      this.addPlayList({ song: this.nowSong });
    });
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    innerAudioContext.onPause(() => {
      this.isPlay = false;
      console.log("暂停");
    });
    innerAudioContext.onTimeUpdate(() => {
      console.log(innerAudioContext.duration, innerAudioContext.currentTime);
      this.musicSlider =
        (innerAudioContext.currentTime / innerAudioContext.duration) * 100;
      this.musicNow = innerAudioContext.currentTime;
    });
  },
};
</script>

<style>
.container {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-size: 100% 100%;
  filter: blur(30px);
}
.content {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.record {
  width: 600rpx;
  height: 600rpx;
  background-image: url("/static/play/record.png");
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  transform-origin: 0% 50%;
  top: 250rpx;
  text-align: center;
}
.turn_around {
  animation: around 15s linear infinite;
}
@keyframes around {
  0% {
    transform: rotate(0deg) translate(-50%);
  }
  100% {
    transform: rotate(360deg) translate(-50%);
  }
}
.record image {
  width: 340rpx;
  height: 340rpx;
  border-radius: 50%;
  margin-top: 130rpx;
}
.bottom_paly_bar {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 340rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}
.top_box {
  height: 100rpx;
}
.center_box {
  height: 80rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  align-items: center;
}
.bottom_box {
  height: 100rpx;
  text-align: center;
  align-items: center;
}
.small_icon {
  width: 40rpx;
  height: 40rpx;
}
.play_pause {
  border-radius: 50%;
  border: 1px solid #fff;
  height: 100rpx;
  width: 100rpx;
  text-align: center;
}
.play_icon {
  width: 40rpx;
  height: 40rpx;
  margin-top: 30rpx;
  margin-left: 8rpx;
}
.pause_icon {
  width: 40rpx;
  height: 40rpx;
  margin-top: 30rpx;
}
.slider {
  display: inline-block;
  width: 560rpx;
}
.music_date {
  display: inline-block;
  color: #fff;
  transform: translateY(-8rpx);
}
</style>