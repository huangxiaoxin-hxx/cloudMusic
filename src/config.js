let baseUrl;
if (process.env.NODE_ENV == "development") {
  baseUrl = "http://localhost:3000"; // 本地开发环境地址
} else {
  baseUrl = "http://prod.com"; // 线上生产环境地址
}

export const $config = {
  name: "App", // 项目名称
  api: {
    baseUrl, // 后端接口地址
    timeout: 10000, // 10秒超时
    url: {
      upload: "api/v1/media/upload"
    }
  },
  // 默认首页地址
  index: {
    url: "/pages/default/index",
    type: "switchTab"
  },
  store: {
    // infinite: 无限下拉, page: 分页, data: 普通数据, 自定义函数 ({ state, rootState }, data) => { return data; }
    commitType: "infinite",
    // 默认分页数据结构
    defaultPaginationData: {
      data: [],
      total: 0,
      from: 0,
      to: 0,
      path: null,
      per_page: 15,
      current_page: 0,
      last_page: 1,
      first_page_url: null,
      last_page_url: null,
      next_page_url: null,
      prev_page_url: null,
      has_next_page: true
    }
  },
  // 多语言
  i18n: {
    defaultLang: "zh_CN",
    supportedLocales: [
      {
        title: "简体中文",
        value: "zh_CN"
      },
      // {
      //   title: "繁體中文",
      //   value: "zh_TW"
      // },
      {
        title: "English",
        value: "en_US"
      }
    ]
  },
  // 在线客服
  customerService: {
    baseUrl: "http://www.cclive.co",
    business_id: "tysh"
  }
};
