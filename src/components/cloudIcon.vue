<template>
  <text
    :class="[isUnicode ? '' : name, isGrace?'grace-icons':'iconfont']" v-html="isUnicode ? name:'' "></text>
</template>

<script>
// 引入上面下载得到的使用 font-class 图标必须的 css 文件
export default {
  props: {
    type: {
      type: String,
      default: "iconfont"
    },
    name: {
      type: String,
      default: "",
      required: true
    },
  },
  data() {
    return {};
  },
  computed: {
    isGrace() {
      return this.type == "grace";
    },
    isUnicode() {
      return this.name.startsWith("&#");
    },
    iconName() {
      return `${hash}${this.aliasName || this.name}`;
    }
  }
};
</script>

