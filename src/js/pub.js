//引入axios库
import axios from 'axios'

//通用函数
export default {
    async http_get(url) {
        let data = (await axios.get(url))['data'];
        console.log(data);
        return data;
    },

    test() {
        console.log("hello public");
    }
};