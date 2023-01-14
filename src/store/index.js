import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import user from './module/user'
import category from './module/category'
import product from './module/product'
import user_register from './module/user_register'
import transaction from './module/transaction'
import result from './module/result'
import dashboard from './module/dashboard'
import company from './module/company'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  }
}

export default new Vuex.Store({
  state,
  modules: {
    auth,
    user,
    category,
    product,
    user_register,
    transaction,
    result,
    dashboard,
    company
  },
  mutations
})