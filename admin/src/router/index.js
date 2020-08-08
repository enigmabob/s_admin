import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import header from '@/components/commen/header'
import banner from '@/components/banner'
import footer from '@/components/commen/footer'
import videoList from '@/components/videoList'
// 后台首页登录
import login from '@/components/login'
import home from '@/components/home'

import addVideo from '@/components/videoManage/addVideo'

import tag from '@/components/tag/tag'

import album from '@/components/album/album'
import text from '@/components/text'
Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/addVideo',
        name: 'addVideo',
        component: addVideo
      }]

    },

    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/tag',
        name: 'tag',
        component: tag
      }]
    },
    {
      path: '/album',
      name: 'album',
      component: home,
      children: [{
        path: '/album',
        name: 'album',
        component: album
      }]
    },

    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/text',
        name: 'text',
        component: text
      }]
    },
    {
      path: '/index',
      name: 'index',
      components: {
        header,
        banner,
        footer,
        videoList
      }
    }, {
      path: '/login',
      name: 'login',
      components: {
        login
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/login') return next()
  var userinfo =  localStorage.getItem('userinfo')

  if (!userinfo  || userinfo  === "undefined") return next('/login')
  next()
})

export default router
