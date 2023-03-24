const sidebar = require("./siderbar.js");
module.exports = {
  title: "loy blog",
  description: "",
  dest: "public",
  // "base": '/my_blog/',
  base: "/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  plugins: [
    "@vuepress-reco/vuepress-plugin-comments",
    "vuepress-plugin-meting",
  ],
  theme: "reco",
  themeConfig: {
    mode: "light",
    subSidebar: "auto",
    nav: [
      {
        text: "主页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "Contact",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "github.com/loycoder",
            icon: "reco-github",
          },
        ],
      },
    ],
    sidebar,
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "目录索引",
      },
      tag: {
        location: 3,
        text: "标签索引",
      },
    },
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "loy",
    authorAvatar: "https://avatars.githubusercontent.com/u/33513180?v=4",
    record: "xxxx",
    startYear: "2020",
  },
  markdown: {
    lineNumbers: true,
  },
};
