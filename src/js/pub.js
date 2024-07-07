//引入axios库
import axios from 'axios'
//字符串处理函数
import _ from 'lodash';

//通用函数
export default {
    async http_get(url) {
        let data = (await axios.get(url))['data'];
        console.log(data);
        return data;
    },

    test() {
        console.log("hello public");
    },

    //转换成大写
    upperCase(str) {
        return _.upperCase(str);
    }
};