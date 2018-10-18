//引入vue
import Vue from 'vue'
//获取参数
import  getQueryString from './getQueryString';
//引入路由组件
import Router from 'vue-router';

import cookie from '../static/js/cookie';

//注册路由
Vue.use(Router);
//引入路由需要的组件


//公共部分
import app from '../views/app/app';

//全局状态控制引入
import store from '../store/store'

//异步加载首页
// var home = function(resolve) {
//   require.ensure(['../views/home/home'], () => {
//     resolve(require('../views/home/home'))
//   }, 'home')
// };

import Home from '../views/home/home'
import NavMenu from '../views/head/NavMenu'
import footer from '../views/footer/footer'



//配置路由
let router = new Router({
  routes: [
    {
      path: '/app',
      component: app,
      children: [
        {
          path: 'home',
          name: 'home',
          component: {
            head: NavMenu,
            content: NavMenu,
            footer: footer,
          },
          meta: {
            title: "首页",
            need_log: false
          }
        }
      ]
    }
  ]
});

//进行路由判断
router.beforeEach((to, from, next) => {
  let nextPath = cookie.getCookie('nextPath');
  console.log(nextPath);
  console.log("to",to);
  console.log("from",from);
    if (to !== undefined) {
      if (to.meta.need_log) {
        console.log(to.meta.need_log);
        if (!store.state.userInfo.token) {
          next({
            path: '/app/home',
          });
        } else {
          next();
        }
      } else {
        if (to.path === '/') {
          next({
            path: '/app/home',
          });
        } else {
          next();
        }
      }
    } else {
      if (to.path === '/') {
        next({
          path: '/app/home',
        });
      } else {
        next();
      }
    }
});

//修改网页标题
router.afterEach((to, from, next) => {
  document.title = to.matched[to.matched.length - 1].meta.title;
});

//抛出路由
export default router;
