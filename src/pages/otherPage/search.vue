<template>
  <cloudPage>
    <cloudHeader slot="gHeader">
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
        <view class="grace-header-content-noflex grace-text-center">
          <input
            type="text"
            :placeholder="search_default"
            v-model="searchText"
            class="search-input"
            @focus="searchFocus"
          />
          <image
            v-if="searchText"
            src="/static/search/close.png"
            class="close"
            @tap.stop="closeText"
          />
        </view>
        <!-- 右侧按钮 -->
        <view class="" style="width: 40rpx"></view>
      </view>
    </cloudHeader>
    <view class="container">
      <!-- 历史记录 -->
      <view class="history flex" v-if="history.length != 0">
        <view class="history-title">历史</view>
        <scroll-view class="scroll-X" scroll-x="true">
          <block v-for="(item, index) in history" :key="index">
            <view class="history-item" @tap.stop="searchKey(item)">{{
              item
            }}</view>
          </block>
        </scroll-view>
        <view class="delete" @tap.stop="deleteHistory">
          <image src="/static/delete.png" />
        </view>
      </view>
      <!-- 热搜榜 -->
      <view class="hot">
        <view class="hont-title flex">
          <view class="flex1">热搜榜</view>
          <!-- 播放全部，后面做 -->
        </view>
        <view class="hot-box" :class="more ? 'more' : ''">
          <block v-for="(item, index) in hotList" :key="index">
            <view class="hot-item" @tap.stop="searchKey(item.searchWord)">
              <view
                class="rank_num"
                :style="{ color: index + 1 < 4 ? '#e94b53' : '' }"
                >{{ index + 1 }}</view
              >
              <view class="rank_name">{{ item.searchWord }}</view>
              <!-- 我也不知道是哪个属性控制这个标签的，就写死前四个吧 -->
              <view class="rank_type" style="font-size: 20rpx" v-if="index < 4"
                >HOT</view
              >
            </view>
          </block>
        </view>
        <!-- 展开更多 -->
        <view class="hot_more" @tap.stop="openMore" v-if="!more"
          >展开更多热搜 <image src="/static/downArrow.png" mode=""
        /></view>
      </view>
    </view>
    <view class="mask" v-if="suggest" @tap.stop="closeSuggest">
      <view class="search_suggest">
        <view class="list_search top_list" @tap.stop="searchKey(searchText)"
          >搜索 “{{ searchText }}”</view
        >
        <block v-for="item in suggest_list" :key="item.id">
          <view class="list_search" @tap.stop="searchKey(item.name)">{{
            item.name
          }}</view>
        </block>
      </view>
    </view>
  </cloudPage>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchText: null,
      search_default: null,
      more: false,
      suggest: false, // 搜索建议
      suggest_list: [],
    };
  },
  methods: {
    ...mapActions("cloud/search", [
      "searchDefault",
      "hotSearch",
      "searchSuggest",
      "addHistory",
      "delHistory",
    ]),
    // 展开更多热搜
    openMore() {
      this.more = true;
    },
    // 搜索关键词
    searchKey(key) {
      console.log(key);
      this.addHistory({ data: key });
      this.handleNavTo({ url: "/pages/otherPage/searchList?key=" + key });
      this.closeSuggest();
      // console.log(this.history);
    },
    // 删除历史记录
    deleteHistory() {
      this.delHistory();
    },
    // 获得焦点
    searchFocus() {
      if (!this.searchText) {
        return;
      }
      this.suggest = true;
    },
    closeText() {
      this.searchText = null;
    },
    closeSuggest() {
      this.suggest = false;
    },
  },
  computed: {
    ...mapGetters("cloud/search", ["hotList", "history"]),
  },
  async onLoad() {
    this.search_default = await this.searchDefault();
    await this.hotSearch();
  },
  watch: {
    // 搜索关键词，直接监听
    async searchText(newVal) {
      if (!newVal) {
        this.suggest = false;
        return;
      }
      this.suggest = true;
      this.suggest_list = await this.searchSuggest({
        keywords: newVal,
        limit: 10,
      });
      console.log(this.suggest_list);
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx;
  color: #fff;
}
.back-icon {
  width: 60rpx;
  height: 60rpx;
  margin-top: 15rpx;
}
.search-input {
  width: 100%;
  height: 60rpx;
  border-bottom: 1px solid rgba(173, 172, 172, 0.5);
  text-align: left;
  font-size: 28rpx;
}
.scroll-X {
  width: 550rpx;
  /* margin-left: 80rpx; */
  box-sizing: border-box;
  padding: 0 12rpx 0;
  white-space: nowrap;
  height: 60rpx;
}
.history {
  /* margin-top: 40rpx; */
  width: 100%;
  height: 60rpx;
  position: relative;
  margin-bottom: 20rpx;
}
.history-title {
  width: 100rpx;
  text-align: center;
  line-height: 60rpx;
  color: #fff;
  font-weight: 600;
}
.history-item {
  background-color: #252525;
  min-width: 40rpx;
  padding: 0 20rpx;
  display: inline-block;
  height: 60rpx;
  line-height: 60rpx;
  color: #fff;
  font-weight: 400;
  border-radius: 50rpx;
  margin-right: 20rpx;
  text-align: center;
}
.delete {
  width: 100rpx;
  height: 60rpx;
  text-align: center;
}
.delete image {
  width: 40rpx;
  height: 40rpx;
  margin-top: 10rpx;
}
.hont-title {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #fff;
  border-bottom: 1px solid rgba(127, 127, 127, 0.5);
}
.hot-box {
  width: 100%;
  height: 320rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}
.hot-item {
  width: 50%;
  display: inline-block;
  height: 60rpx;
  line-height: 60rpx;
}
.rank_num {
  color: #999;
  font-size: 32rpx;
  display: inline-block;
  overflow: hidden;
  width: 50rpx;
}
.rank_name {
  width: 200rpx;
  display: inline-block;
  box-sizing: border-box;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rank_type {
  display: inline-block;
  color: #e94b53;
  margin-left: 20rpx;
  font-style: oblique;
  font-weight: 600;
  overflow: hidden;
}
.hot_more {
  width: 100%;
  height: 80rpx;
  font-size: 24rpx;
  line-height: 80rpx;
  text-align: center;
}
.hot_more image {
  width: 30rpx;
  height: 30rpx;
  transform: translateY(5rpx);
}
.hot-box.more {
  transition: all 0.5s;
  height: 640rpx;
}
.search_suggest {
  z-index: 5;
  width: 686rpx;
  height: 900rpx;
  background-color: #0c0d10;
  position: absolute;
}
.list_search {
  padding: 0 32rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-bottom: 1px solid rgba(127, 127, 127, 0.5);
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list_search.top_list {
  color: #6682a2;
}
.close {
  width: 50rpx;
  height: 50rpx;
  position: absolute;
  top: 14rpx;
  right: 30rpx;
}
.mask {
  position: fixed;
  padding: 0 32rpx;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
</style>