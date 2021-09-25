import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views - menu
const Dashboard = () => import('@/views/menu/dashboard')
const Agenda = () => import('@/views/menu/agenda')
const DokumenOPD = () => import('@/views/menu/dokumen-opd')
const Download = () => import('@/views/menu/download')
const Pesan = () => import('@/views/menu/pesan')
const OnlineChat = () => import('@/views/menu/online-chat')

const History = () => import('@/views/menu/history')
const Gallery = () => import('@/views/menu/gallery')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

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

function configRoutes () {
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
          name: 'Agenda',
          component: Agenda
        },
        {
          path: 'history',
          name: 'History',
          component: History
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
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'dokumen-opd',
              name: 'Dokumen OPD',
              component: DokumenOPD
            },
            {
              path: 'download',
              name: 'Download',
              component: Download
            }
          ]
        },

        {
          path: 'komunikasi',
          redirect: '/komunikasi/pesan',
          name: 'Komunikasi',
          component: {
            render (c) { return c('router-view') }
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
        
     
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
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
        }
      ]
    }
  ]
}

