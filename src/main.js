// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import MyHttp from '@/plugins/MyHttp'
import Moment from 'moment'

// 添加全局过滤器
Vue.filter('fmtDate', (value, fmtStr) => {
  return Moment(value).format(fmtStr)
})

Vue.use(ElementUI)
Vue.use(MyHttp)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
