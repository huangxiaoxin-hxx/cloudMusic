<template>
  <view class="container">
    <view class="top-avatar flex">
      <view class="avatar">
        <image src="/static/avatar.png" />
      </view>
      <view class="login">立即登录 ></view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 32rpx;
}
.avatar {
  width: 110rpx;
  height: 110rpx;
  background-color: #feffff;
  text-align: center;
  line-height: 200rpx;
  border-radius: 50%;
  margin-right: 40rpx;
}
.avatar image {
  width: 110rpx;
  height: 110rpx;
}
.login {
  color: #fff;
  font-size: 32rpx;
  line-height: 110rpx;
  height: 110rpx;
}
</style>