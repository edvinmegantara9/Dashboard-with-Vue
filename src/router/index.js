 import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views - menu
const Dashboard = () => import('@/views/menu/Dashboard')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const User = () => import('@/views/menu/User')
const Role = () => import('@/views/menu/Role')
const Menu = () => import('@/views/menu/Menu')
const Donasi = () => import('@/views/menu/Donasi')
const Restaurant = () => import('@/views/menu/Restaurant')

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
          path: 'user',
          name: 'Kelola User',
          component: User
        },
        {
          path: 'role',
          name: 'Kelola Role',
          component: Role
        },
        {
          path: 'menu',
          name: 'Kelola Menu',
          component: Menu
        },
        {
          path: 'donasi',
          name: 'Kelola Donasi',
          component: Donasi
        },
        {
          path: 'restaurant',
          name: 'Kelola Restaurant',
          component: Restaurant
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
      ]
    }
  ]
}

