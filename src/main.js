// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' 
// import router from './router'
import ElementUI from 'element-ui';
import router from './router/index';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import store from './store/index'
Vue.use(Vuex)
// 公共样式
import './assets/css/common.css'
import CommonJs from './assets/javascript/common.js';
import Excel from './assets/javascript/excel.js';
import Print from './assets/javascript/print.js';
import './common/font/font.css';

// 时间处理插件
import moment from "moment";
import Axios from 'axios';
Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(CommonJs);
Vue.use(Excel);
Vue.use(Print) // 注册







/* eslint-disable no-new */
// export const store = new Vuex.Store({
//   state:{
//     counter:0
//   }
// })


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  
})

