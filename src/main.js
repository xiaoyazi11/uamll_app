// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入reset
import "./assets/css/reset.css"

// vuex
import store from "./store"

//过滤器
import "./filters"

// 公共组件
import "./components"

// 7.element-ui:安装 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);





Vue.config.productionTip = false




new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
