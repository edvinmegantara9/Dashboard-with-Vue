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

import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2'
// select
Vue.component('v-select', vSelect)

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

// setup base url
Vue.prototype.$http = axios;
// axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// add token to localstorage
if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.getItem('token');
}
// check error handling
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.data) {
    
    // error token expired
    if (error.response.data.status == 401) {
      console.log(error.response.data.message);
      Swal.fire({icon: 'error', text: error.response.data.message});
      store.dispatch('auth/logout');
      router.replace('/login');
    }

    // error email not verified
    if (error.response.status == 403) {
      router.replace('/email-verification');
    }

    // error validasi form
    if (error.response.status == 422) {
      let message = '';
      Object.keys(error.response.data).forEach(element => {
          message += error.response.data[element][0] + '<br />'
      })
      Swal.fire({icon: 'error', html: message});
    }

    // error message
    if (error.response.status == 400) {
      Swal.fire({icon: 'error', html: error.response.data.message});
    }

    return Promise.reject(error);
  }

  // error network
  if (!error.status) {
    Swal.fire({icon: 'error', html: error.message});
  }
  return Promise.reject(error);
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
    if (hasToken) {
      next({ path: '/dashboard' })
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

Vue.use(VueSweetalert2);

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

const firebaseConfig = {
  apiKey: "AIzaSyAsUmHxqP_vQKDTXlzrJdAYu2QFgjMXgrM",
  authDomain: "gps-tracker-3c2a1.firebaseapp.com",
  databaseURL: "https://gps-tracker-3c2a1.firebaseio.com",
  projectId: "gps-tracker-3c2a1",
  storageBucket: "gps-tracker-3c2a1.appspot.com",
  messagingSenderId: "893074004983",
  appId: "1:893074004983:web:f27abdb4faaa62d395acf2"
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
