//引入axios库
import axios from 'axios';

//通用函数
export default {
    //通过ID获取组件
    getElementById(Id) {
        return document.getElementById(Id);
    },

    //使用GET方法获取数据
    async http_get(url) {
        let data = (await axios.get(url))['data'];
        console.log(data);
        return data;
    },

    //测试函数
    test() {
        console.log("hello public");
    },
};