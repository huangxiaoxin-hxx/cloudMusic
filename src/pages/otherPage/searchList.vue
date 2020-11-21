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
    <view class="search_tabbar flex">
      <block v-for="(item, index) in searchTab" :key="index">
        <view class="flex1 tabbar_item" @tap.stop="selectNav(item.id)">
          <view
            class="nav_text"
            :class="navTab == item.id ? 'nav_text_select' : ''"
            >{{ item.name }}</view
          >
        </view>
      </block>
    </view>
    <view class="container">
      <comprehensive
        v-if="navTab == 1 && refresh"
        :searchKey="searchText"
        @moreSong="moreSong"
        @moreSheet="moreSheet"
      />
      <all-songs v-if="navTab == 2 && refresh" :searchKey="searchText" />
      <sheet-list v-if="navTab == 3 && refresh" :searchKey="searchText" />
    </view>
    <view class="mask" v-if="suggest" @tap.stop="closeSuggest">
      <view class="search_suggest">
        <view class="list_search top_list" @tap.stop="searchKey(searchText)"
          >搜索 “{{ searchText }}”</view
        >
        <block v-for="item in suggest_list" :key="item.id">
          <view class="list_search" @tap.stop="clickSearch(item.name)">{{
            item.name
          }}</view>
        </block>
      </view>
    </view>
  </cloudPage>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import comprehensive from "./components/comprehensive";
import allSongs from "./components/allSongs";
import sheetList from "./components/sheetList";
export default {
  components: {
    comprehensive,
    allSongs,
    sheetList,
  },
  data() {
    return {
      searchText: null,
      searchTab: [
        {
          id: 1,
          name: "综合",
        },
        {
          id: 2,
          name: "单曲",
        },
        {
          id: 3,
          name: "歌单",
        },
        {
          id: 4,
          name: "视频",
        },
        {
          id: 5,
          name: "歌手",
        },
      ],
      navTab: 1,
      search_default: null,
      suggest: false,
      suggest_list: [],
      refresh: true,
      isShowSuggest: false,
    };
  },
  async onLoad(option) {
    this.searchText = option.key;
    this.search_default = await this.searchDefault();
    this.suggest_list = await this.searchSuggest({
      keywords: this.searchText,
      limit: 10,
    });
    this.suggest = false;
  },
  methods: {
    ...mapActions("cloud/search", [
      "searchDefault",
      "searchSuggest",
      "addHistory",
      "cloudSearch",
      "searchSheet",
    ]),
    selectNav(id) {
      this.navTab = id;
    },
    searchFocus() {
      if (!this.searchText) {
        return;
      }
      this.suggest = true;
    },
    closeSuggest() {
      this.suggest = false;
    },
    searchKey(key) {
      console.log(key);
      this.addHistory({ data: key });
      this.searchText = key;
      this.refresh = false;
      this.closeSuggest();
      setTimeout(() => {
        this.refresh = true;
      }, 100);
    },
    clickSearch(key) {
      this.searchKey(key);
      this.isShowSuggest = true;
    },
    moreSong() {
      this.navTab = 2;
    },
    moreSheet() {
      this.navTab = 3;
    },
  },
  watch: {
    // 搜索关键词，直接监听
    async searchText(newVal) {
      if (!newVal) {
        this.suggest = false;
        return;
      }
      if (!this.isShowSuggest) {
        this.suggest = true;
      }
      this.suggest_list = await this.searchSuggest({
        keywords: newVal,
        limit: 10,
      });
      console.log(this.suggest_list);
      this.isShowSuggest = false;
    },
  },
  computed: {
    ...mapGetters("cloud/search", ["allSearch", "allSheet"]),
  },
  onReachBottom() {
    if (this.navTab == 2 && this.allSearch.has_next_page) {
      this.cloudSearch({
        offset: this.allSearch.offset + 1,
        limit: 20,
        keywords: this.searchText,
      });
    } else if (this.navTab == 3 && this.allSheet.has_next_page) {
      this.searchSheet({
        offset: this.allSheet.offset + 1,
        limit: 20,
        keywords: this.searchText,
      });
    }
  },
};
</script>

<style scoped>
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
.close {
  width: 50rpx;
  height: 50rpx;
  position: absolute;
  top: 14rpx;
  right: 30rpx;
}
.search_tabbar {
  background: #2c2c2c;
  width: 100%;
  height: 70rpx;
  position: fixed;
  top: 88rpx;
  z-index: 100;
}
.tabbar_item {
  color: #fff;
  text-align: center;
  line-height: 70rpx;
  font-weight: 600;
  position: relative;
}
.nav_text {
  width: 70rpx;
  height: 70rpx;
  box-sizing: border-box;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.nav_text.nav_text_select {
  color: #de5756;
  border-bottom: 3px solid #de5756;
  box-sizing: border-box;
}
.container {
  padding: 100rpx 32rpx 0;
  box-sizing: border-box;
}
.mask {
  position: fixed;
  padding: 0 32rpx;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
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
</style>