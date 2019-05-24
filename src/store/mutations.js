import * as types from './mutation-types';
import cookie from '../static/js/cookie';
// 类似于事件 每个mutation都有字符类型的事件类型和回调函数
//全局引入vue
import Vue from 'vue';
import Axios from 'axios';
Vue.prototype.$http = Axios;


export default {
    [types.SET_INFO] (state) {
        state.userInfo = {
            id:cookie.getCookie('id'),
            name:cookie.getCookie('name'),
            token:cookie.getCookie('token'),
            isSuperUser:cookie.getCookie('isSuperUser')
        };
    },
    [types.SET_ACCEPTEDPROBLEMS] (state) {
      state.userAcceptedProblems = JSON.parse(localStorage.getItem('acceptedproblems'));
    },
    [types.SET_CHALLENGINGPROBLEMS] (state) {
      state.userChallengingProblems = JSON.parse(localStorage.getItem('challengingproblems'));
    },
    [types.SET_COLLECTIONS] (state) {
      state.userCollections = JSON.parse(localStorage.getItem('collections'));
    },


}
