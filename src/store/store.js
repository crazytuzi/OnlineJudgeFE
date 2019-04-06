//引入vue
import Vue from 'vue'
//全局引入vueX
import Vuex from 'vuex';

import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

//全局注册vueX
Vue.use(Vuex);
//全局引用cookie方法类
import cookie from '../static/js/cookie';

const userInfo = {
            id:cookie.getCookie('id') || null,
            name:cookie.getCookie('name') || null,
            token:cookie.getCookie('token') || null,
            isSuperUser:cookie.getCookie('isSuperUser') || null
        };
const userAcceptedProblems = localStorage.getItem('acceptedproblems') || null;
const userChallengingProblems = localStorage.getItem('challengingproblems') || null;
const userCollections = localStorage.getItem('collections') || null;
const state = {
    topnavigation:"/",
    userInfo,
    userAcceptedProblems,
    userChallengingProblems,
    userCollections,
};
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});



