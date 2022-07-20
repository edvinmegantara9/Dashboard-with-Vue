 import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views - menu
const Dashboard = () => import('@/views/menu/dashboard')
const Agenda = () => import('@/views/menu/agenda')
const DokumenOPD = () => import('@/views/menu/dokumen-opd')
const DokumenPeraturan = () => import('@/views/menu/dokumen-peraturan')
const Pesan = () => import('@/views/menu/pesan')
const OnlineChat = () => import('@/views/menu/online-chat')
const MasterUser = () => import('@/views/menu/master-user')
const MasterOPD = () => import('@/views/menu/master-opd')
const MasterRole = () => import('@/views/menu/master-role')
const History = () => import('@/views/menu/history')
const Gallery = () => import('@/views/menu/gallery')
const TipeDokumen = () => import('@/views/menu/tipe-dokumen')
const DetailAgenda = () => import('@/views/menu/detail-agenda')
const DokumenKota = () => import('@/views/menu/dokumen-kota')
const LaporanHarian = () => import('@/views/menu/laporan-harian')
const LaporanMasyarakat = () => import('@/views/menu/laporan-masyarakat')
const JadwalPerencanaan = () => import('@/views/menu/jadwal-perencanaan')
const PaketPekerjaan = () => import('@/views/menu/paket-pekerjaan')
const PotensiPasar = () => import('@/views/menu/potensi-pasar')
const Quarry = () => import('@/views/menu/quarry')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const ExportPDF = () => import('@/views/menu/components/daily-report-pdf')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})



function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'agenda',
          redirect: '/agenda/list',
          name: 'Agenda',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'Agenda list',
              component: Agenda
            },
            {
              path: 'detail',
              name: 'Detail Agenda',
              component: DetailAgenda
            },

          ]
        },
        {
          path: 'history',
          name: 'History',
          component: History
        },
        {
          path: 'master-user',
          redirect: '/master-user/user',
          name: 'Master User',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'user',
              name: 'User data',
              component: MasterUser
            },
            {
              path: 'opd',
              name: 'OPD',
              component: MasterOPD
            },
            {
              path: 'role',
              name: 'Role',
              component: MasterRole
            }
          ]
        },
        {
          path: 'laporan-harian',
          name: 'Laporan Harian',
          component: LaporanHarian
        },
        {
          path: 'export-file-pdf',
          name: 'ExportPDF',
          component: ExportPDF
        },
        {
          path: 'laporan-masyarakat',

          name: 'Laporan Masyarakat',

          component: LaporanMasyarakat
        },
        {
          path: 'gallery',
          name: 'Gallery',
          component: Gallery
        },
        {
          path: 'data',
          redirect: '/data/dokumen-opd',
          name: 'Data',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'dokumen-opd',
              name: 'Dokumen OPD',
              component: DokumenOPD
            },
            {
              path: 'peraturan',
              name: 'Dokumen Peraturan',
              component: DokumenPeraturan
            },
            {
              path: 'kota',
              name: 'Dokumen Kota',
              component: DokumenKota
            },
            {
              path: 'tipe-dokumen',
              name: 'Tipe Dokumen',
              component: TipeDokumen
            },
            {
              path: 'jadwal-perencanaan',
              name: 'Jadwal Perencanaan',
              component: JadwalPerencanaan
            }
          ]
        },

        {
          path: 'komunikasi',
          redirect: '/komunikasi/pesan',
          name: 'Komunikasi',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'pesan',
              name: 'Pesan',
              component: Pesan
            },
            {
              path: 'online-chat',
              name: 'Online Chat',
              component: OnlineChat
            }
          ]
        },

        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },

        {
          path: 'paket-pekerjaan',
          name: 'Paket Pekerjaan',
          component: PaketPekerjaan
        },
        {
          path: 'potensi-pasar',
          name: 'Potensi Pasar',
          component: PotensiPasar
        },
        {
          path: 'quarry',
          name: 'Quarry',
          component: Quarry
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
      ]
    }
  ]
}

