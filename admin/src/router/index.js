import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import header from '@/components/commen/header'
import banner from '@/components/banner'
import footer from '@/components/commen/footer'
import videoList from '@/components/videoList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
