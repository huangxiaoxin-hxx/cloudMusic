<script>
import { readEndurance } from "./utils/i18n";
export default {
  onLaunch: function () {
    console.log("App Launch");
    let lanange = readEndurance();
    if (lanange) {
      this.$i18n.locale = lanange;
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
@import "./graceUI/animate.css";
@import "./graceUI/graceUI.css";
@import "./graceUI/graceIcons.css";
@import "./common/css/common.css";

/* 默认背景 */
page {
  background: #151515;
}
/* 导航配色 */
.grace-header {
  background: #2c2c2c;
}
.grace-header-body > view {
  color: #fff;
}
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.back-icon {
  width: 60rpx;
  height: 60rpx;
  margin-top: 15rpx;
}
</style>
