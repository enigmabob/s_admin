// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Qs from 'qs'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'

import Axios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/commen/commen.css'
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme
import {store} from './vuex/store'

import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS


Vue.use(iView);
 import VueQuillEditor from 'vue-quill-editor'



Vue.use(VueQuillEditor, /* { default global options } */)
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
axios.defaults.baseURL = 'http://144.34.249.110:28000/api'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Qs)
Vue.use(Axios, axios)
Vue.use(ElementUI)

// axios.interceptors.request.use(
//   config => {
//     var t = window.sessionStorage.getItem('token')
//     //console.log(t)
//     if (t !== "undefined") config.data.access_token = t
//     if (config.data) {
//       config.data = Qs.stringify(config.data)
//       config.Headers = {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//       }
//     }
//     return config
//   }

// )

axios.interceptors.request.use(
  config => {
    var t = window.localStorage.getItem('token')
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if(config.data == undefined){
      config.data = [];
    }
    if (t !== "undefined" && t != undefined) {

      config.data.access_token = t
    }

    config.device = flag ? 'h5' : 'pc'
    console.log(config)
    if (config.data) {
      config.data = Qs.stringify(config.data)
      config.Headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    return config
  }
)

axios.interceptors.response.use(function (res) {

  //为什么多了个data

  //console.log(res)
  if(res.data.code == 401){
    //需要重新登录
    window.localStorage.setItem('userinfo', '')
    
  }

  if(res.data.access_token != undefined && res.data.access_token !== "undefined")
    window.localStorage.setItem('token', res.data.access_token)
  // 对响应数据做点什么
  // response 是请求回来的数据
  return res;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
}
)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
