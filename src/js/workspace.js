//定义workspace组件用的所有变量和函数（页面主体部分，选择加载，用户工作空间）
document.addEventListener("alpine:init", () => {
  Alpine.data("workspace", function () {
    return {
      //拒绝暴露变量，所有变量的读写都通过函数完成!!!
      //*****************************  全局变量  ***************************//
      //所有工作空间列表
      workspaces: [
        {
          id: 1,
          label: "解析报文",
          url: "http://127.0.0.1:3000/static/html/message_parse.html",
        },
        {
          id: 2,
          label: "字符处理",
          url: "http://127.0.0.1:3000/static/html/string_handle.html",
        },
        //{'id': 3, 'label': '数据查询', 'url': undefined             },
        //{'id': 4, 'label': '日志处理', 'url': undefined             },
      ],
      //已经加载的工作空间
      loadedWorkspaces: {},
      //当前功能ID
      currentId: 1,
      //默认工作区ID
      defaultId: 1,

      //定义测试页面
      first: "<h1>First Page</h1>",
      second: "<h1>Second Page</h1>",

      lklhj_init() {
        if (window.location.pathname.includes("first")) {
          return this.first;
        } else if (window.location.pathname.includes("second")) {
          return this.second;
        } else {
          return this.first;
        }
      },
    };
  });
});
