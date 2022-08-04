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
import UserIndex from '@/views/user/UserIndex'
import muma from '../views/home/muma.vue'



import userRoute from './module/user'

import storageService from "../service/storageService";
import toolRoute from './module/tools'


Vue.use(Router)



const router=new Router({
  mode: 'history',
  routes: [
    ...userRoute,
    ...toolRoute,

    {
      path: '/Home',
      name: 'Home',
      component: Home,
      // meta: {
      //   auth:true,//需要认证的路由
      // },
      children: [
        // {path: '/home/scan',component:scan},
        { path: '/home/Host', 
        component: Host,
        meta: {
          auth:true,
        }, 
        },
        {
          path: '/home/UserIndex',
          name: 'UserIndex',
          component: UserIndex,
          meta:{
              auth:true,//需要认证的路由
          }
      },
        { path: '/home/Kit', component: Kit },
        { path: '/home/muma', component: muma },


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
          name:'Manage', path: '/control/Manage/:id/:hostName/:address/:edgeAddress', component: Manage, meta: {
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
        showfater: true,//父组件展示
        // auth:true,//需要认证的路由
      }
    },
  ],

})

router.beforeEach((to, from, next) => {
  if (to.meta.auth ) {//判断是否需要登录
    
    //判断用户是否登录
    if(storageService.USER_TOKEN){
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