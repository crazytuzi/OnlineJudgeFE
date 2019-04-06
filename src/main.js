//这个是全局文件

import mock from '../mock/mock.js'

//全局引入jq
import $ from 'jquery';
//全局引入vue
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCodemirror from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
Vue.use(ElementUI);
Vue.use(VueCodemirror);
//全局引入共用css
import './static/css/common.css'
//引入字体样式
import './static/css/iconfont..css'
//全局引入路由配置
import router from './router';


//全局状态控制引入
import store from './store/store';


//全局加载resource拦截器
import './axios/';
import Axios from 'axios';
Vue.prototype.$http = Axios;


//引入需要渲染的视图组件
import App from './App';

//创建全局实例
new Vue({
    el:'#app',
    router,
    store,
    template:'<App/>',
    components:{App}
});


