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
const BatasWilayah = () => import('@/views/menu/batas-wilayah')
const Lab = () => import('@/views/menu/lab')
const AlatKontruksi = () => import('@/views/menu/alat-kontruksi')
const Sbu = () => import('@/views/menu/sbu')
const Ska = () => import('@/views/menu/ska')
const Skt = () => import('@/views/menu/skt')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const ExportPDF = () => import('@/views/menu/components/daily-report-pdf')
const PaketPekerjaanExportPDF = () => import('@/views/menu/components/paket-pekerjaan-pdf')
const SbuExportPDF = () => import('@/views/menu/components/sbu-pdf')
const SktExportPDF = () => import('@/views/menu/components/skt-pdf')
const SkaExportPDF = () => import('@/views/menu/components/ska-pdf')
const QuarryExportPDF = () => import('@/views/menu/components/quarry-pdf')
const LabExportPDF = () => import('@/views/menu/components/lab-pdf')
const AlatKontruksiExportPDF = () => import('@/views/menu/components/alat-kontruksi-pdf')
const BatasWilayahExportPDF = () => import('@/views/menu/components/batas-wilayah-pdf')
const Category = () => import('@/views/menu/category')

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
          path: 'paket-pekerjaan-pdf',
          name: 'PaketPekerjaanExportPDF',
          component: PaketPekerjaanExportPDF
        },
        {
          path: 'sbu-pdf',
          name: 'SbuExportPDF',
          component: SbuExportPDF
        },
        {
          path: 'skt-pdf',
          name: 'SktExportPDF',
          component: SktExportPDF
        },
        {
          path: 'ska-pdf',
          name: 'SkaExportPDF',
          component: SkaExportPDF
        },
        {
          path: 'quarry-pdf',
          name: 'QuarryExportPDF',
          component: QuarryExportPDF
        },
        {
          path: 'lab-pdf',
          name: 'LabExportPDF',
          component: LabExportPDF
        },
        {
          path: 'alat-kontruksi-pdf',
          name: 'AlatKontruksiExportPDF',
          component: AlatKontruksiExportPDF
        },
        {
          path: 'batas-wilayah-pdf',
          name: 'BatasWilayahExportPDF',
          component: BatasWilayahExportPDF
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
          path: 'category',
          name: 'Pengelolaan Category',
          component: Category
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
        {
          path: 'batas-wilayah',
          name: 'Batas Wilayah',
          component: BatasWilayah,
        },
        {
          path: 'lab',
          name: 'Lab',
          component: Lab
        },
        {
          path: 'alat-kontruksi',
          name: 'Sewa Alat Kontruksi',
          component: AlatKontruksi
        },
        {
          path: 'sbu',
          name: 'Sbu',
          component: Sbu
        },
        {
          path: 'ska',
          name: 'Ska',
          component: Ska
        },
        {
          path: 'skt',
          name: 'Skt',
          component: Skt
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

