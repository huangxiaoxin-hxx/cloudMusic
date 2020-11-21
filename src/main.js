import Vue from "vue";
import { $i18n } from "./boot/i18n";
import { $store } from "./store";
import "./boot/handler";
import "./boot/http";
import "./boot/filter";
import "./boot/mixin";
import App from "./App";

import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

Vue.component("mescroll-body", MescrollBody);
Vue.component("mescroll-uni", MescrollUni);
Vue.mixin(MescrollMixin);

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
  store: $store,
  i18n: $i18n
});
app.$mount();
