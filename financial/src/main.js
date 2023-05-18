// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import axios from 'axios'
Vue.prototype.$ajax = axios

Vue.config.productionTip = false
/* eslint-disable no-new */

router.beforeEach(function (to,from,next) {
  if(to.meta.auth===true&&!sessionStorage.getItem('token')){
    next({
      path:'/login'
    });
  }else {
    next();
  }
})
axios.interceptors.request.use(function (config) {     //请求拦截器，这里主要是为了设置loading动画的生成
  $('#loading').show();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {    //响应拦截器，这里主要是为了关闭loading动画
  $('#loading').hide();
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})

