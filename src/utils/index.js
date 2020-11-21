import moment from "moment";
import Schema from "async-validator";

export async function validate(data, rule) {
  const validator = new Schema(rule);

  return validator.validate(data);
}

export function setStorage(key, val, cacheSeconds = null) {
  uni.setStorageSync(key, val);
  if (cacheSeconds > 0) {
    const duration = moment()
      .add(cacheSeconds, "seconds")
      .valueOf();
    uni.setStorageSync(key + "_cache", duration);
  }
}

export function removeStorage(key) {
  uni.removeStorageSync(key);
  uni.removeStorageSync(key + "_cache");
}

export function getStorage(key, defaultVal = null) {
  const val = uni.getStorageSync(key);
  const valCache = uni.getStorageSync(key + "_cache");
  if (valCache > 0) {
    const currentTimestamp = moment().valueOf();
    if (valCache < currentTimestamp) {
      removeStorage(key);
      return defaultVal;
    }
  }
  return val !== "" ? val : defaultVal;
}

// TODO 完善平台检测
export function platform() {
  let version = "1.0.0";
  // #ifdef APP-PLUS
  version = plus.runtime.version;
  // #endif
  const systemInfo = uni.getSystemInfoSync();

  const platform = {
    version,
    app: {
      app: false,
      ios: false,
      android: false
    },
    h5: false,
    mp: {
      mp: false,
      qq: false,
      weixin: false,
      alipay: false,
      baidu: false,
      toutiao: false,
      "360": false
    }
  };
  // #ifdef APP-PLUS
  platform.app.app = true;
  platform.app.android = systemInfo.platform == "android";
  platform.app.ios = systemInfo.platform == "ios";
  // #endif

  return platform;
}
