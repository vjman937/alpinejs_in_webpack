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
            label: "十六进制字符个数统计",
            func: "sh_hex_count"
          },
          {
            id: 2,
            label: "16进制转ASCii码(目的地码/版本号)",
            func: "sh_hex2ascii"
          },
          {
            id: 3,
            label: "16进制转字节数组",
            func: "sh_hex2uint8Arr"
          },
          {
            id: 4,
            label: "去除所有非16进制字符",
            func: "sh_del_non_hex"
          },
          {
            id: 10,
            label: "全部转大写",
            func: "sh_toUpper"
          },
          { 
            id: 11,
            label: "全部转小写",
            func: "sh_toLower"
          },
          {
            id: 100,
            label: "有需求请联系姜佳佳",
            func: "notSupported"
          }
        ],
        /**< ############################# 变量管理 #################################### */

        /**< ############################# html中调用的函数 ############################ */
        //获取用户选择的功能后对输入框的字符串进行处理，并写入输出框
        sh_handle: function(InputId, SelectId, OutputId) {
            let input = this.getUserInputById(InputId);
            let func = this.getSelectFuncById(SelectId);
            let result = "";

            //console.log("func:" + _.toString(func));
            if ("notSelect" === func) {
              alert("老伙计提醒: \n未选择字符处理方式");
            } else if ("notSupported" === func) {
              alert("老伙计提醒: \n这不是一个有效的字符处理方式");
            } else if ("" === input) {
              alert("老伙计提醒: \n巧妇难为无米之炊啊~搞点米~输入点东西吧");
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
        //十六进制字符个数统计
        sh_hex_count : function(str) {
          //除掉空格等无效字符
          let result = "";
          let originLength = str.length;
          let regex = /[^0-9a-fA-F]/g;
          let newStr = str.replace(regex, "");
          //计算16进制字符个数
          let newLength = newStr.length;
          //打印16进制字节个数(保留1位小数)
          let byteLength = _.floor(newLength / 2, 1);
          result += "统计结果: \n";
          result += _.toString(byteLength) + " 个字节\n";
          result += _.toString(newLength) + " 个字符\n";
          result += "注意: '6'为1个字符, 0.5个字节\n";
          result += "'66'为2个字符, 1个字节";
          console.log(result);
          //存在非16进制字符则告警
          if (originLength != newLength) {
            alert("老伙计提醒: \n字符串中存在非16进制字符");
          }
        },

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