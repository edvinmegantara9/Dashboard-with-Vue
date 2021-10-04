import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/index.js'
import axios from 'axios'
//  vue loading
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// pagination
import Pagination from 'vue-pagination-2';
// vue toast
import VueToast from 'vue-toast-notification';
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
//  select multiple 
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
// select
Vue.component('v-select', vSelect)

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

// setup base url
Vue.prototype.$http = axios;
// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://silaper.xsrindonesia.com/api/';

// add token to localstorage
if(localStorage.getItem('token')){
  axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.getItem('token');
}
// check valid token
axios.interceptors.response.use((response) => {
  if(response.data.status === 401) {
       
       console.log("You are not authorized");
  }
  return response;
}, (error) => {
  if (error.response && error.response.data) {
       
       if(error.response.data.status == 401 || error.response.data.status == 403){
         store.dispatch('auth/logout');
         router.replace('/');         
       }
       return Promise.reject(error.response.data.message);
  }
  return Promise.reject(error.message);
});

// guard for auth
router.beforeEach((to,from,next) => {
  var hasToken = localStorage.getItem('token');
  if(to.path != '/pages/login') {
    
    if(hasToken){
      next();
      return
    }
      next('/pages/login');
      return
  }else{
    if(hasToken){
      next({path: '/dashboard'})
      return
    }
  }

  next();
  
})

// setup overlay loading
Vue.use(VueLoading, {
    // props
    color: 'blue',
    loader: 'dots',
    height: 64,
    width: 64,
  }, {
    // slots
})

//  setup toast
Vue.use(VueToast, {
    // One of the options
    position: 'top-right',
    duration: 2000
})

// pagination
Vue.component('pagination', Pagination);

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
