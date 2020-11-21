import { merge } from "lodash-es";
import { mapStore } from "../../utils/store";
import { $http } from "../../boot/http";

export default merge(
  {
    namespaced: true,
    state: {
      banner: null,
      ball: null,
      personalized: null,
      newSongs: null
    },
    mutations: {
      setBanner(state, data) {
        state.banner = data
      },
      setBall(state, data) {
        state.ball = data
      },
      setPersonalized(state, data) {
        state.personalized = data
      },
      setNewSongs(state, data) {
        state.newSongs = data
      }
    },
    getters: {
      banner(state) {
        return state.banner || []
      },
      ball(state) {
        return state.ball || []
      },
      personalized(state) {
        return state.personalized || []
      },
      newSongs(state) {
        return state.newSongs || []
      }
    },
    actions: {
      // 获取首页发现banner
      async getBanner({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "find.banner",
            loading: async () => {
              let { data } = await $http.get("/banner", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              commit("setBanner", data.banners)
            }
          },
          { root: true }
        );
      },
      // 首页-发现 /homepage/block/page
      async getFindPage({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "find.banner",
            loading: async () => {
              let { data } = await $http.get("/homepage/block/page", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              // commit("setBanner", data.banners)
            }
          },
          { root: true }
        );
      },
      // 首页-发现-圆形图标入口列表 /homepage/dragon/ball
      async getFindBall({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "find.dragon_ball",
            loading: async () => {
              let { data } = await $http.get("/homepage/dragon/ball", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              commit("setBall", data.data)
            }
          },
          { root: true }
        );
      },
      // 获取推荐歌单
      async getPersonalized({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "find.personalized",
            loading: async () => {
              let { data } = await $http.get("/personalized", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              commit("setPersonalized", data.result)
            }
          },
          { root: true }
        );
      },
      // 推荐新音乐 /personalized/newsong
      async getNewSong({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "find.personalized_newsong",
            loading: async () => {
              let { data } = await $http.get("/personalized/newsong", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              commit("setNewSongs", data.result)
            }
          },
          { root: true }
        );
      },
    },
  },
);
