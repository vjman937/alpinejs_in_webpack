//定义navbar组件用的所有变量和函数（页面标题栏）
document.addEventListener("alpine:init", () => {
  Alpine.data("navbar", () => {
    return {
      message: "navbar",
    };
  });
});
