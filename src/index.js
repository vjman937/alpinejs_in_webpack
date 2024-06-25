//import _ from 'lodash';
//import printMe from './js/print.js';

//引入自定义JS库
import './js/global.js';

//引入CSS库
import './css/index.css';

//引入Alpinejs
import Alpine from 'alpinejs';
 
window.Alpine = Alpine;
 
Alpine.start();

//function component() {
//    const element = document.createElement('div');
//    const btn = document.createElement('button');
//  
//    //js库引入 lodash现在使用import引入
//    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//    //引入css
//    element.classList.add('hello');
//
//    btn.innerHTML = 'Click me and check the console!';
//    btn.onclick = printMe;
//
//    element.appendChild(btn);
//  
//    return element;
//}
//  
//document.body.appendChild(component());