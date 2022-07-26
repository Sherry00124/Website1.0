import Vue, { shallowReactive } from 'vue'
import Router from 'vue-router'


import Home from '../views/Home'

import Control from '../views/home/Control'
import Host from '../views/home/Host'

import Proxy from '../views/home/control/Proxy'
import Port from '../views/home/control/Port'
import Manage from '../views/home/control/Manage'
import Kit from '../views/home/Kit'
import Cascade from '../views/home/control/Cascade'
import Xshell from '../views/home/control/Xshell'
import WebSSH from '../views/home/control/XWebSSH'

import CV from '../views/tool/CV.vue'
import Copy from '../views/tool/Copy.vue'


import userRoute from './moudle/user'

import userModule from '@/store/module/user'

Vue.use(Router)



const router=new Router({
  mode: 'history',
  routes: [
    ...userRoute,
    {
      path: '/copy',
      name: 'copy',
      component: Copy,
    },
    {
      path: '/cv',
      name: 'cv',
      component: CV,
    },
    
  
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        // {path: '/home/scan',component:scan},
        { path: '/home/Host', component: Host },
        { path: '/home/Kit', component: Kit },

      ]
    },
    {
      path: '/Control',
      // path: '/home/Control/:number',

      name: 'Control',
      component: Control,
      children: [
        // {path: '/home/scan',component:scan},
        {
          path: '/control/Proxy', component: Proxy, meta: {
            showfater: false
          },
        },
        {
          path: '/control/Manage', component: Manage, meta: {
            showfater: false
          },
        },
        {
          path: '/control/Port', component: Port, meta: {
            showfater: false
          },
        },

        {
          path: '/control/Cascade', component: Cascade, meta: {
            showfater: false
          },
        },
        {
          path: '/control/Xshell', component: Xshell, meta: {
            showfater: false
          },
        },
        {
          path: '/control/webssh', component: WebSSH, name: 'WebSSH', meta: {
            showfater: false
          },
        },

      ],
      meta: {
        showfater: true
      }
    },
  ],

})

router.beforeEach((to, from, next) => {
  if (to.meta.auth ) {//判断是否需要登录

    //判断用户是否登录
    if(userModule.token){
      //判断token的有效性，需要后台发放token时带上token的有效期
      next();
    }else{
      //没有登录则跳转登录
      router.push({name: 'Login'})
    }
  }else{
    next();
  }
})
export default router;