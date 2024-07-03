//引入通用工具库
//import _ from 'lodash';

//引入自定义组件功能库
import "./js/navbar.js";
import "./js/drawer.js";
import "./js/footer.js";
import "./js/workspace.js";

//引入自定义通用函数库
import "./js/global.js";

//引入CSS库
import "./css/index.css";

//引入Alpinejs,并使之生效
import Alpine from "alpinejs";
//导入alpinejs-router库
import router from "@shaun/alpinejs-router";

window.Alpine = Alpine;

//加载alpinejs插件
Alpine.plugin(router);//加载alpinejs-router

Alpine.start();