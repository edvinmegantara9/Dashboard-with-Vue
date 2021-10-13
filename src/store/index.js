import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import user from './module/user'
import role from './module/role'
import opd from './module/opd'
import docs from './module/docs'
import gallery from './module/gallery'
import report from './module/report'


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
    role,
    opd,
    docs,
    gallery,
    report
  },
  mutations
})