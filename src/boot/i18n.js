import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "../i18n";
import { $config } from "../config";

Vue.use(VueI18n);

const $i18n = new VueI18n({
  locale: $config.i18n.defaultLang || "zh_CN",
  fallbackLocale: $config.i18n.defaultLang || "zh_CN",
  messages
});

Vue.prototype._i18n = $i18n;

export { $i18n };
