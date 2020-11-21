import { setStorage, getStorage } from "../utils";

const LANG_KEY = "language";

/**-
 * 设置持久化
 * @param {*} lang 语言
 */
export function setUpEndurance(lang) {
  setStorage(LANG_KEY, lang);
}

/**
 * 读取持久化数据
 */
export function readEndurance() {
  return getStorage(LANG_KEY, "zh-cn");
}
