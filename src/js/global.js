import pub from "./pub.js"

//定义全局变量和函数
document.addEventListener("alpine:init", () => {
    Alpine.data("globals", () => {
      return {
        //axios使用范例
        //globals_http_get : function(url) {
        //    axios.get(url)
        //    .then(function(response) {
        //        //console.log(response);
        //        let data = response['data'];
        //        console.log(data);
        //    });
        //},
        // globals_http_get : async function(url) {
        //     let data = (await axios.get(url))['data'];
        //     console.log(data);
        //     return data;
        // },

        glb_http_get : async function(url) {
          let data = pub.http_get(url);
          //console.log(data);
          console.log("111");
          return data;
        },

        glb_test : function() {
           //let str = "<h1>hello guys 1</h1>";
           //console.log(str);
           //return str;
           pub.test();
        },
      };
    });
  });