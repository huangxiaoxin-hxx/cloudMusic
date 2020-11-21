import { merge } from "lodash-es";
import { mapStore } from "../../utils/store";
import { $http } from "../../boot/http";

export default merge(
  {
    namespaced: true,
    state: {
      songId: null,
      nowSong: null,
      playList: null
    },
    mutations: {
      setSongId(state, id) {
        state.songId = id
      },
      setNowSong(state, data) {
        state.nowSong = data
      },
      setPlayList(state, data) {
        console.log(data)
        let isSong = false
        // 如果歌单为空，直接加入
        if (!state.playList) {
          state.playList = [data]
          return
        }
        // 判断歌单中是否有这首歌
        state.playList.map((item) => {
          if (item.id == data.id) {
            isSong = true // 有相同的歌曲
            console.log(isSong)
          }
        })
        if (!isSong) {
          state.playList = [data, ...state.playList]
        }
      }
    },
    getters: {
      // 获取当前播放歌曲的信息
      nowSong(state) {
        return state.nowSong || {}
      },
      playList(state) {
        return state.playList || []
      }
    },
    actions: {
      // 获取当前播放歌曲的信息
      async getNowSong({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.cloudsearch_info",
            loading: async () => {
              let { data } = await $http.get("/cloudsearch", params)
              if (data.code != 200) {
                uni.showToast({
                  title: data.msg,
                  duration: 2000,
                  icon: "none"
                });
              }
              // console.log(data)
              commit("setNowSong", data.result.songs[0])
            }
          },
          { root: true }
        );
      },
      // 将播放的歌曲加入播放列表
      async addPlayList({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "search.add_play_list",
            loading: async () => {
              console.log(params.song)
              commit("setPlayList", params.song)
            }
          },
          { root: true }
        );
      },
    },
  },
);
