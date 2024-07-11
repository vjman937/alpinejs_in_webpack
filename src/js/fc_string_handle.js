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
        getSelectFuncById : function() {
          let func = pub.getElementById('str_fc_select').value;
          return func;
        },

        //获取用户输入的待处理字符串
        getUserInputById : function() {
          let input = pub.getElementById('str_input').value;
          //console.log(input);
          return input;
        },

        //获取输出组件，并写入结果
        setOutputById : function(result) {
          pub.getElementById('result_output').value = result;
        },

        //重置组件
        resetById : function() {
          pub.getElementById('str_fc_select').value = 'notSelect';
          pub.getElementById('str_input').value = '';
          pub.getElementById('result_output').value = '';
        },
        /**< ############################# 引入公共函数 ################################ */

        /**< ############################# 变量管理 #################################### */
        //字符处理功能列表
        stringFunctions : [
          {
            id: 1,
            label: "十六进制字数统计",
            func: "sh_hex_count"
          },
          {
            id: 2,
            label: "16进制转字节数组",
            func: "sh_hex2uint8Arr"
          },
          {
            id: 3,
            label: "去除所有非16进制字符",
            func: "sh_del_non_hex"
          },
          {
            id: 4,
            label: "16进制转ASCii码(目的地码/版本号)",
            func: "sh_hex2ascii"
          },
          {
            id: 5,
            label: "ASCii码转16进制(反向)",
            func: "sh_ascii2hex"
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
        sh_handle : function() {
            let input = this.getUserInputById();
            let func = this.getSelectFuncById();
            let result = "";

            //console.log("func:" + _.toString(func));
            if ("notSelect" === func) {
              alert("老伙计提醒: \n未选择字符处理方式");
            } else if ("notSupported" === func) {
              alert("老伙计提醒: \n这不是一个有效的字符处理方式");
            } else if ("" === input) {
              alert("老伙计提醒: \n巧妇难为无米之炊啊~搞点米~输入点东西吧");
            } else if (false === _.includes(_.map(this.stringFunctions, 'func'), func)) {//检查被调用的方法函数是否合法
              alert("老伙计提醒: \n本站是小本经营, 求大佬放过啊!");
            } else {
              //字符串中的换行符会影响eval()执行,需要先处理,转换成特殊短语
              //console.log("1:" + _.toString(input));
              input = this.sh_transToUseableString(input);
              //console.log("2:" + _.toString(input));
              result = eval("this." + func + "('" + input + "')");
              this.setOutputById(result);
            }
        },

        //重置组件
        sh_reset : function() {
          this.resetById();
        },
        
        //返回功能列表
        sh_getStringFunctions : function() {
            return this.stringFunctions;
        },
        /**< ############################# html中调用的函数 ############################ */


        /**< ############################# 内部调用函数 ################################ */
        //适应eval函数需要把换行符转换成特殊短语
        sh_transToUseableString : function(str) {
          return str.replace(/[\n]/g, 'VJ937');
        },

        //将出入特殊短语的输入转换成原始输入
        sh_transToOriginString : function(str) {
          return str.replace(/(VJ937)/g, '\n');
        },

        //十六进制字符个数统计
        sh_hex_count : function(str) {
          str = this.sh_transToOriginString(str);
          //先判断是否存在g-zG-Z的字符,若有则标记有非法字符
          let illegal = false;
          let arr = str.match(/[g-zG-Z]/g);
          if (true !== _.isEmpty(arr)) {
            illegal = true;
          }

          //去掉无关字符
          str = _.trim(str, " ',~|#^*()-_+=[]{}.?\r\n");
          let result = "";
          
          //开始计算
          let newStr = str.replace(/[^0-9a-fA-F]/g, "");
          let newLength = newStr.length;
          if (0 < newLength)//无16进制字符则告警
          {
            //打印16进制字节个数(保留1位小数)
            let byteLength = _.floor(newLength / 2, 1);
            result += "统计结果: \n";
            result += _.toString(byteLength) + " 个字节\n";
            result += _.toString(newLength) + " 个字符\n\n";
            result += "举例说明:\n";
            result += "'6'为1个字符, 0.5个字节\n";
            result += "'66'为2个字符, 1个字节";

            if (true === illegal) {
              alert("老伙计提醒: \n字符串中存在g-z或G-Z的字符");
            }
            //console.log(result);
          } else {
            alert("老伙计提醒: \n字符串中无16进制相关字符");
          }
          return result;      
        },

        //16进制转字节数组
        sh_hex2uint8Arr : function(str) {
          let result = "";
          str = this.sh_transToOriginString(str);
          str = str.replace(/[^0-9a-fA-F]/g, "");
          if (0 < str.length) {
            //判断是否需要高位补0
            if (0 !== str.length % 2) {
              str = '0' + str;
              alert("老伙计提醒: \n字符个数为奇数,首字符补1个0");
            }

            let arr = str.match(/[0-9a-fA-F]{2}/g);

            for (let i = 0; i < arr.length; i++) {
              if (arr.length - 1 === i) {
                arr[i] = "0x" + arr[i];
              } else {
                arr[i] = "0x" + arr[i] + ", ";
              }
            }

            _.forEach(arr, function(value) {
              result += value;
            });
          } else {
            alert("老伙计提醒: \n字符串中并没有16进制相关字符");
          }

          return result;
        },

        //去除所有非16进制字符
        sh_del_non_hex : function(str) {
          let result = "";
          str = this.sh_transToOriginString(str);
          //去掉无关字符
          result = str.replace(/[^0-9a-fA-F]/g, "");

          return result;
        },

        //16进制转ASCii码(目的地码/版本号)
        sh_hex2ascii : function(str) {
          let result = '';
          str = this.sh_transToOriginString(str);

          //先判断是否存在g-zG-Z的字符,若有则标记有非法字符
          let illegal = false;
          let arr = str.match(/[g-zG-Z]/g);
          if (null !== arr) {
            illegal = true;
          }

          //去掉无关字符
          str = str.replace(/[^0-9a-fA-F]/g, "");
          if (0 < str.length) {
            //判断是否需要高位补0
            if (0 !== str.length % 2) {
              str = '0' + str;
              alert("老伙计提醒: \n字符个数为奇数,首字符补1个0");
            }

            arr = str.match(/[0-9a-fA-F]{2}/g);

            for (let i = 0; i < arr.length; i++) {
              arr[i] = "0x" + arr[i];
              arr[i] = _.toNumber(arr[i]);
            }

            _.map(arr, function(value) {
              result += String.fromCharCode(value);
            });

            if (true === illegal) {
              alert("老伙计提醒: \n字符串中存在g-z或G-Z的字符");
            }
          }

          return result;
        },

        //ASCii码转16进制(反向)
        sh_ascii2hex : function(str) {
          let result = "";
          str = this.sh_transToOriginString(str);

          let arr = _.split(str, '');

          for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charCodeAt(0);
            arr[i] = arr[i].toString(16);
            console.log(arr[i]);
            if (arr.length - 1 === i) {
              arr[i] = "0x" + _.toString(arr[i]);
            } else {
              arr[i] = "0x" + _.toString(arr[i]) + ", "
            }
          }

          _.map(arr, function(value) {
            result += value;
          });

          return result;
        },

        //全部转大写
        sh_toUpper : function(str) {
          str = this.sh_transToOriginString(str);
          return _.toUpper(str);
        },

        //全部转小写
        sh_toLower : function(str) {
          str = this.sh_transToOriginString(str);
          return _.toLower(str);
        },
        /**< ############################# 内部调用函数 ################################ */
        
      };
    });
  });