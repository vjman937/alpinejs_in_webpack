//字符串处理函数
import _ from 'lodash';

//引入公共函数库
import pub from "./pub.js";

//定义全局变量和函数
document.addEventListener("alpine:init", () => {
    Alpine.data("string_handle", () => {
      return {
        /**< ############################# 引入公共函数 ################################ */
        //获取用户选择的功能
        getSelectFuncById : function(Id) {
            let func = pub.getElementById(Id).value;
            //console.log(func);
            return func;
        },

        //获取用户输入的待处理字符串
        getUserInputById : function(Id) {
            let input = pub.getElementById(Id).value;
            //console.log(input);
            return input;
        },

        //获取输出组件，并写入结果
        setOutputById : function(Id, result) {
            pub.getElementById(Id).value = result;
        },
        /**< ############################# 引入公共函数 ################################ */

        /**< ############################# 变量管理 #################################### */
        //字符处理功能列表
        stringFunctions : [
          { 
            id: 1,
            label: "全部转大写",
            func:"sh_toUpper"
          },
          { 
            id: 2,
            label: "全部转小写",
            func:"sh_toLower"
          },
        ],
        /**< ############################# 变量管理 #################################### */

        /**< ############################# html中调用的函数 ############################ */
        //获取用户选择的功能后对输入框的字符串进行处理，并写入输出框
        sh_handle: function(InputId, SelectId, OutputId) {
            let input = this.getUserInputById(InputId);
            let func = this.getSelectFuncById(SelectId);
            let result = "";

            if ((false === func) || ("" === input)) {
                result = "老伙计提醒: \n必须确保有输入 且 已选择字符串处理方式, 老伙计才能正常工作哦";
                this.setOutputById(OutputId, result);
                alert(result);
            } else {
                result = eval("this." + func + "('" + input + "')");
                this.setOutputById(OutputId, result);
            }
        },
        
        //返回功能列表
        sh_getStringFunctions: function() {
            return this.stringFunctions;
        },
        /**< ############################# html中调用的函数 ############################ */


        /**< ############################# 内部调用函数 ################################ */
        //全部转大写
        sh_toUpper : function(str) {
          return _.toUpper(str);
        },

        //全部转小写
        sh_toLower : function(str) {
          return _.toLower(str);
        },
        /**< ############################# 内部调用函数 ################################ */
        
      };
    });
  });