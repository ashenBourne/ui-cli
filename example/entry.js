import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import elementTest from 'main/index.js'
import 'ui-cli/lib/theme-chalk/index.css'
import routes from './route.config'
import demoBlock from './components/demo-block'
Vue.config.productionTip = false
Vue.use(elementTest)
Vue.use(VueRouter)
Vue.component('demo-block', demoBlock)
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})
// step0：国际化

// step1：添加路由
new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')
