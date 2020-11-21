<template>
  <cloudPage>
    <cloudHeader slot="gHeader">
      <view class="grace-header-body">
        <!-- 返回按钮 -->
        <view class="grace-header-icons grace-icons">
          <image src="/static/index/menu.png" class="menu" />
        </view>
        <!-- 中间内容 -->
        <view class="grace-header-content-noflex grace-text-center">
          <view class="flex tabbar">
            <block v-for="item in tabbar" :key="item.index">
              <view
                class="flex1"
                @tap.stop="selectTab(item.index)"
                :class="navIndex == item.index ? 'select-text' : ''"
                >{{ item.name }}</view
              >
            </block>
          </view>
        </view>
        <!-- 右侧按钮 -->
        <view
          class="icons grace-icons"
          @tap.stop="handleNavTo({ url: '/pages/otherPage/search' })"
        >
          <image src="/static/index/search.png" class="search" />
        </view>
      </view>
    </cloudHeader>
    <view class="container">
      <my-page v-if="navIndex == 0" />
      <find-page v-if="navIndex == 1" />
    </view>
  </cloudPage>
</template>

<script>
import findPage from "./tabPage/find";
import myPage from "./tabPage/my";
export default {
  components: {
    findPage,
    myPage,
  },
  data() {
    return {
      tabbar: [
        {
          name: "我的",
          index: 0,
        },
        {
          name: "发现",
          index: 1,
        },
        {
          name: "云村",
          index: 2,
        },
        {
          name: "视频",
          index: 3,
        },
      ],
      navIndex: 1,
    };
  },
  methods: {
    selectTab(index) {
      if (this.navIndex == index) {
        return;
      }
      this.navIndex = index;
    },
  },
};
</script>

<style scoped>
.menu {
  width: 60rpx;
  height: 50rpx;
  margin-top: 20rpx;
}
.tabbar {
  width: 100%;
  box-sizing: border-box;
  padding: 0 70rpx;
  color: #b2b2b2;
}
.select-text {
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
}
.search {
  width: 40rpx;
  height: 40rpx;
}
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 32rpx;
  position: relative;
}
</style>