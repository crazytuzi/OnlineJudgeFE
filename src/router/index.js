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

import home from '../views/home/home'
import problems from '../views/problem/problems'
import status from '../views/status/status'
import contests from '../views/contest/contests'
import rank from '../views/rank/rank'
import NavMenu from '../views/head/nav-menu'
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
          components: {
            'v-header': NavMenu,
            'v-content': home,
            'v-footer': footer
          },
          meta: {
            title: "Home",
            need_log: false
          },
        },
        {
          path: 'problems',
          name: 'problems',
          components: {
            'v-header': NavMenu,
            'v-content': problems,
            'v-footer': footer
          },
          meta: {
            title: "Problems",
            need_log: false
          },
        },
        {
          path: 'status',
          components: {
            'v-header': NavMenu,
            'v-content': status,
            'v-footer': footer
          },
          meta: {
            title: "Status",
            need_log: false
          },
        },
        {
          path: 'contests',
          components: {
            'v-header': NavMenu,
            'v-content': contests,
            'v-footer': footer
          },
          meta: {
            title: "Contests",
            need_log: false
          },
        },
        {
          path: 'rank',
          components: {
            'v-header': NavMenu,
            'v-content': rank,
            'v-footer': footer
          },
          meta: {
            title: "Rank",
            need_log: false
          },
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
      console.log("need_log",to.meta.need_log);
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
