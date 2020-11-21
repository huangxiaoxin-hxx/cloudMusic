<template>
  <!-- 心形加载条 -->
  <view class="heart-loading">
    <ul style="--line-count: 9">
      <li
        v-for="v in 9"
        :key="v"
        :class="`line-${v}`"
        :style="`--line-index: ${v}`"
      ></li>
    </ul>
  </view>
</template>

<script>
export default {
  props: {
    // 第一根颜色
    color: {
      type: String,
      default: "#3c9",
    },
    // 动画时长 （秒）
    duration: {
      type: String,
      default: "2.5s",
    },
    // 相邻两根延时多少（毫秒）
    delay: {
      type: String,
      default: "80ms",
    },
  },
  methods: {
    // 设置进度条
    setBtnColor() {
      document.body.style.setProperty("--btn-color", this.color);
      document.body.style.setProperty("--btn-duration", this.duration);
      document.body.style.setProperty("--btn-delay", this.delay);
    },
  },
  created() {
    this.setBtnColor();
  },
};
</script>

<style scoped>
li {
  list-style-type: none; }

.heart-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px; }
  .heart-loading ul {
    display: flex;
    justify-content: space-between;
    width: 150px;
    height: 10px; }
  .heart-loading li {
    --Θ: calc(var(--line-index) / var(--line-count) * 0.5turn);
    --time: calc((var(--line-index) - 1) * var(--btn-delay));
    border-radius: 5px;
    width: 10px;
    height: 10px;
    background-color: var(--btn-color);
    filter: hue-rotate(var(--Θ));
    animation-duration: var(--btn-duration);
    animation-delay: var(--time);
    animation-iteration-count: infinite; }
    .heart-loading li.line-1, .heart-loading li.line-9 {
      animation-name: beat-1; }
    .heart-loading li.line-2, .heart-loading li.line-8 {
      animation-name: beat-2; }
    .heart-loading li.line-3, .heart-loading li.line-7 {
      animation-name: beat-3; }
    .heart-loading li.line-4, .heart-loading li.line-6 {
      animation-name: beat-4; }
    .heart-loading li.line-5 {
      animation-name: beat-5; }

@keyframes beat-1 {
  0%,
  10%,
  90%,
  100% {
    height: 10px; }
  45%,
  55% {
    height: 30px;
    transform: translate3d(0, -15px, 0); } }

@keyframes beat-2 {
  0%,
  10%,
  90%,
  100% {
    height: 10px; }
  45%,
  55% {
    height: 60px;
    transform: translate3d(0, -30px, 0); } }

@keyframes beat-3 {
  0%,
  10%,
  90%,
  100% {
    height: 10px; }
  45%,
  55% {
    height: 80px;
    transform: translate3d(0, -40px, 0); } }

@keyframes beat-4 {
  0%,
  10%,
  90%,
  100% {
    height: 10px; }
  45%,
  55% {
    height: 90px;
    transform: translate3d(0, -30px, 0); } }

@keyframes beat-5 {
  0%,
  10%,
  90%,
  100% {
    height: 10px; }
  45%,
  55% {
    height: 90px;
    transform: translate3d(0, -20px, 0); } }
</style>