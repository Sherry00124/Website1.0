import Vue from 'vue'
import Router from 'vue-router'

import Register from '../views/Register'
import Login from '../views/Login'
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

import UserIndex from '../views/user/UserIndex'
Vue.use(Router)



export default new Router({
  mode: 'history',
  routes: [
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
      path: '/control/UserIndex',
      redirect: '/UserIndex'
    },
    {
      path: '/UserIndex',
      name: 'UserIndex',
      component: UserIndex

    },
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/control/Login',
      redirect: '/Login'
    },
    {
      path: '/home/Login',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register

    },
    // {
    //   path: '/Home',
    //   redirect:'/Home:id',
    // },
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
