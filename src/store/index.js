import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import user from './module/user'
import menu from './module/menu'
import role from './module/role'
import dashboard from './module/dashboard'


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
    dashboard,
    menu,
    role,
  },
  mutations
})