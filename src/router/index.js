import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NavMenu from '@/views/head/NavMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NavMenu',
      component: NavMenu
    }
  ]
})
