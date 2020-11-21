<template></template>

<script>
import { getStorage, setStorage } from "@/utils";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  // async created() {
  //   if (!getStorage("versionShow", false)) {
  //     setStorage("versionShow", true, 24 * 3600 * 3);
  //     this.checkVersion();
  //   } else {
  //     await this.loadSettings();
  //   }
  // },
  // computed: {
  //   ...mapState("user", ["payPasswordSetShow", "realSetShow"]),
  //   ...mapState("system", ["versionShow"]),
  //   ...mapGetters("system", ["version", "newVersion", "download"]),
  // },
  // methods: {
  //   ...mapMutations("user", ["setPayPasswordSetShow", "setRealSetShow"]),
  //   ...mapActions("user", ["setPayPassword"]),
  //   ...mapMutations("system", ["setVersionShow"]),
  //   ...mapActions("system", ["loadSettings", "checkVersion"]),
  //   async updatePayPassword({ password }) {
  //     this.setPayPassword({ password });
  //     this.setPayPasswordSetShow(false);
  //   },
  // },
};
</script>

<style scoped>
.set-pay-pass-icon {
  width: 97rpx;
  height: 104rpx;
}
</style>
