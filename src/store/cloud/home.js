import { merge } from "lodash-es";
import { mapStore } from "../../utils/store";
import { $http } from "../../boot/http";

export default merge(
  {
    namespaced: true,
    state: {
    },
    mutations: {

    },
    getters: {

    },
    actions: {
      async loadProfitList({ commit, dispatch }, params) {
        return dispatch(
          "toggleLoading",
          {
            key: "fund.profit_list",
            loading: async () => {
              let { data } = await $http.get("search", params)
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
  },
);
