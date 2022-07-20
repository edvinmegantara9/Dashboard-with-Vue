import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import user from './module/user'
import role from './module/role'
import opd from './module/opd'
import docs from './module/docs'
import gallery from './module/gallery'
import report from './module/report'
import message from './module/message'
import room from './module/room'
import report_citizen from './module/report-citizen'
import history_chat from './module/history-chat'
import schedule from './module/schedule'
import paket_pekerjaan from './module/paket-pekerjaan'
import potensi_pasar from './module/potensi-pasar'
import quarry from './module/quarry'

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
    report,
    message,
    room,
    report_citizen,
    history_chat,
    schedule,
    paket_pekerjaan,
    potensi_pasar,
    quarry
  },
  mutations
})