//定义footer组件用的所有变量和函数
document.addEventListener('alpine:init', () => {
    Alpine.data('footer', () => {
        return {
            message: "列控小喇叭: Alpine is working..."
        };
    })
});
