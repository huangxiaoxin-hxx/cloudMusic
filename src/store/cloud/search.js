import { merge } from "lodash-es";
import { mapStore } from "../../utils/store";
import { $http } from "../../boot/http";

export default merge(
  {
    namespaced: true,
    state: {
      history: null,
      hotList: null,
      newPlay: null,
      allSearch: null,
      allSheet: null,
    },
    mutations: {
      setHistory(state, data) {
        if (!state.history) {
          state.history = [data]
        } else {
          var index = state.history.indexOf(data)
          if (state.history.length < 20) { // 如果历史记录小于20
            if (index == -1) {
              state.history = [data, ...state.history]
            } else {
              state.history.splice(index, 1)
              state.history = [data, ...state.history]
            }
          } else {
            if (index == -1) {
              state.history.splice(19, 1)
              state.history = [data, ...state.history]
            } else {
              state.history.splice(index, 1)
              state.history = [data, ...state.history]
            }
          }
        }
      },
      del_History(state) {
        state.history = null
      },
      setHotList(state, data) {
        state.hotList = data
      },
      setAllSearch(state, { data, params }) {
        console.log(data, params)
        let newData = state.allSearch ? state.allSearch : {}
        let oldData = state.allSearch ? state.allSearch : []
        if (!params.offset || params.offset == 1) {
          newData.offset = 1
          newData.data = data.result.songs
          newData.count = data.result.songCount
          if (newData.data.length >= data.result.songCount) {
            newData.has_next_page = false
          } else {
            newData.has_next_page = true
          }
        } else {
          newData.data = oldData.data.concat(data.result.songs)
          newData.offset = params.offset
          if (newData.data.length >= data.result.songCount) {
            newData.has_next_page = false
          } else {
            newData.has_next_page = true
          }
          // console.log(newData.data)
        }
        state.allSearch = newData
      },
      setAllSheet(state, { data, params }) {
        console.log(data, params)
        let newData = state.allSheet ? state.allSheet : {}
        let oldData = state.allSheet ? state.allSheet : []
        if (!params.offset || params.offset == 1) {
          newData.offset = 1
          newData.data = data.result.playlists
          newData.count = data.result.playlistCount
          if (newData.data.length >= data.result.playlistCount) {
            newData.has_next_page = false
          } else {
            newData.has_next_page = true
          }
        } else {
          newData.data = oldData.data.concat(data.result.playlists)
          newData.offset = params.offset
          if (newData.data.length >= data.result.playlistCount) {
            newData.has_next_page = false
          } else {
            newData.has_next_page = true
          }
          // console.log(newData.data)
        }
        state.allSheet = newData
      }
    },
    getters: {
      history(state) {
        return state.history || []
      },
      hotList(state) {
        return state.hotList || []
      },
      newPlay(state) {
        return state.newPlay || {}
      },
      allSearch(state) {
        return state.allSearch || []
      },
      allSheet(state) {
        return state.allSheet || []
      }
    },
    actions: {
      // 增加历史记录
      addHistory({ commit, dispatch }, { data }) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.add_history",
            loading: async () => {
              commit("setHistory", data)
            }
          },
          { root: true }
        );
      },
      // 清空历史记录
      delHistory({ commit, dispatch }) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.del_history",
            loading: async () => {
              commit("del_History")
            }
          },
          { root: true }
        );
      },
      // 默认搜索关键词 /search/default
      async searchDefault({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.default",
            loading: async () => {
              let { data } = await $http.get("/search/default", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              return data.data.realkeyword
              // commit("setBall", data.data)
            }
          },
          { root: true }
        );
      },
      // 热门搜索 
      async hotSearch({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.hot_detail",
            loading: async () => {
              let { data } = await $http.get("/search/hot/detail", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              commit("setHotList", data.data)
            }
          },
          { root: true }
        );
      },
      // 搜索建议 /search/suggest
      async searchSuggest({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.suggest",
            loading: async () => {
              let { data } = await $http.get("/search", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data.result.songs)
              return data.result.songs
            }
          },
          { root: true }
        );
      },
      // 搜索单曲接口
      async cloudSearch({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.cloudsearch",
            loading: async () => {
              let { data } = await $http.get("/cloudsearch", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              commit("setAllSearch", { data, params })
              return data.result
            }
          },
          { root: true }
        );
      },
      // 获取音乐URL
      async getUrl({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.song_url",
            loading: async () => {
              let { data } = await $http.get("/song/url", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              return data.data
            }
          },
          { root: true }
        );
      },
      // 搜索歌单
      async searchSheet({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.search_sheet",
            loading: async () => {
              let { data } = await $http.get("/cloudsearch?type=1000", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              commit("setAllSheet", { data, params })
              return data.result
            }
          },
          { root: true }
        );
      },
      // 获取歌单详情  /playlist/detail
      async getSheetDetail({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.search_sheet",
            loading: async () => {
              let { data } = await $http.get("/playlist/detail", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              // commit("setAllSheet", { data, params })
              return data
            }
          },
          { root: true }
        );
      },
      // 获取歌单全部歌曲
      async getSheetAllSong({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.search_sheet",
            loading: async () => {
              let { data } = await $http.get("song/detail", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              console.log(data)
              // commit("setAllSheet", { data, params })
              return data.songs
            }
          },
          { root: true }
        );
      },
    },
  },
);
