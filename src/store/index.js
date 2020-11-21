import Vue from "vue";
import Vuex from "vuex";
import init from "./plugins/init";

import cloud from './cloud'

Vue.use(Vuex);

const store = {
  plugins: [init],
  state: {
    loading: null,
    toast: null,
    label: null
  },
  mutations: {
    clean(state) {
      // 递归模块清除state
      const clean = (_store, _state) => {
        const modules = Object.keys(_store.modules || {});
        const states = Object.keys(_state || {});
        states.map(stateName => {
          if (!modules.includes(stateName)) {
            _state[stateName] = null;
          }
        });

        modules.map(moduleName => {
          clean(_store.modules[moduleName], _state[moduleName]);
        });
      };
      clean(store, state);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setToast(state, toast) {
      state.toast = toast;
    },
    setLabel(state, label) {
      state.label = label;
    }
  },
  getters: {
    loading(state) {
      return state.loading || {};
    },
    label(state) {
      return state.label || {};
    }
  },
  actions: {
    async makeToast({ commit }, options) {
      commit("setToast", {
        ...(typeof options === "string"
          ? {
            title: options
          }
          : options)
      });
    },
    async toggleLoading({ state, commit }, { key, loading }) {
      if (typeof loading === "function") {
        try {
          commit("setLoading", {
            ...state.loading,
            [key]: true
          });
          return await loading();
        } finally {
          commit("setLoading", {
            ...state.loading,
            [key]: false
          });
        }
      } else {
        commit("setLoading", {
          ...state.loading,
          [key]: typeof loading === "boolean" ? loading : !state.loading[key]
        });
      }
    },
    async getBanner({ commit, dispatch }, params) {
      return dispatch(
        "toggleLoading",
        {
          key: "find.banner",
          loading: async () => {
            let { data } = await $http.get("/banner", params)
            // if (data.code != 200) {
            //   uni.showToast({
            //     title: data.msg,
            //     duration: 2000,
            //     icon: "none"
            //   });
            // }
            console.log(data.data)
          }
        },
        { root: true }
      );
    },
  },
  modules: {
    cloud
  }
};
const $store = new Vuex.Store(store);

export { $store };
