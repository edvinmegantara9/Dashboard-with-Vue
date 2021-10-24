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
axios.defaults.baseURL = 'http://api-silaper.bappedapagaralam.org/api/';

// add token to localstorage
if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.getItem('token');
}
// check valid token
axios.interceptors.response.use((response) => {
  if (response.data.status === 401) {

    console.log("You are not authorized");
  }
  return response;
}, (error) => {
  if (error.response && error.response.data) {

    if (error.response.data.status == 401 || error.response.data.status == 403) {
      store.dispatch('auth/logout');
      router.replace('/pages/login');
    }
    return Promise.reject(error.response.data.message);
  }
  return Promise.reject(error.message);
});

// guard for auth
router.beforeEach((to, from, next) => {
  var hasToken = localStorage.getItem('token');
  if (to.path != '/pages/login') {

    if (hasToken) {
      next();
      return
    }
    next('/pages/login');
    return
  } else {
    // if (hasToken) {
    //   next({ path: '/dashboard' })
    //   return
    // }
    next();

    return
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

// Firebase
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import "firebase/compat/analytics";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// const firebaseConfig =
// {
//   apiKey: "AIzaSyCwAACGH2QF99QhbQuv3xDxwJFRdxplgYg",
//   projectId: "bwa-flutix-2246a",
//   storageBucket: "bwa-flutix-2246a.appspot.com",
//   messagingSenderId: "359270072999",
//   appId: "1:359270072999:android:8462c6eb8c5d54a9975182",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBtJXWRSed_BHy9XS4e8uZWOjI5bREoES4",
  authDomain: "silaper-fa45b.firebaseapp.com",
  projectId: "silaper-fa45b",
  storageBucket: "silaper-fa45b.appspot.com",
  messagingSenderId: "552838804992",
  appId: "1:552838804992:web:d057e45d911bb2ce668ae5",
  measurementId: "G-26YSE205PD",
  databaseURL: "https://silaper-fa45b-default-rtdb.firebaseio.com/",
};


firebase.initializeApp(firebaseConfig);

// Select-2
import Select2 from 'v-select2-component';

Vue.component('Select2', Select2);

// moment
const moment = require('moment')
require('moment/locale/id')

Vue.use(require('vue-moment'), {
  moment
})

//  scroll chat
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)


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
