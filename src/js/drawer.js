//定义drawer组件用的所有变量和函数(侧边功能列表)
document.addEventListener("alpine:init", () => {
  Alpine.data("drawer", () => {
    return {
      //所有workspace列表
      workspaces: [
        {
          id: 1,
          label: "解析报文",
          url: "http://127.0.0.1:3000/static/html/message_parse.html",
          link: "/message",
        },
        {
          id: 2,
          label: "字符处理",
          url: "http://127.0.0.1:3000/static/html/string_handle.html",
          link: "/string",
        },
        //{'id': 3, 'label': '数据查询', 'url': undefined             },
        //{'id': 4, 'label': '日志处理', 'url': undefined             },
      ],

      //获取workspace
      drawer_getWorkspace() {
        return this.workspaces;
      },
    };
  });
});
