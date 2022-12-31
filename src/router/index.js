 import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views - menu
const Dashboard = () => import('@/views/menu/dashboard')
const MasterUser = () => import('@/views/menu/master-user')
const Sbu = () => import('@/views/menu/sbu')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const SbuExportPDF = () => import('@/views/menu/components/sbu-pdf')
const CategoryExportPDF = () => import('@/views/menu/components/category-pdf')
const ProductExportPDF = () => import('@/views/menu/components/product-pdf')
const UserExportPDF = () => import('@/views/menu/components/user-pdf')
const Category = () => import('@/views/menu/category')
const Product = () => import('@/views/menu/product')
const UserRegister = () => import('@/views/menu/user-register')
const Transaction = () => import('@/views/menu/transaction')
const TransactionExportPDF = () => import('@/views/menu/components/transaction-pdf')
const Result = () => import('@/views/menu/result')
const ResultExportPDF = () => import('@/views/menu/components/result-pdf')
const Dash = () => import('@/views/Dashboard')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

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
          path: 'dash',
          name: 'Dash',
          component: Dash
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
          ]
        },
        {
          path: 'sbu-pdf',
          name: 'SbuExportPDF',
          component: SbuExportPDF
        },
        {
          path: 'category-pdf',
          name: 'CategoryExportPDF',
          component: CategoryExportPDF
        },
        {
          path: 'product-pdf',
          name: 'ProductExportPDF',
          component: ProductExportPDF
        },
        {
          path: 'user-pdf',
          name: 'UserExportPDF',
          component: UserExportPDF
        },
        {
          path: 'transaction-pdf',
          name: 'TransactionExportPDF',
          component: TransactionExportPDF
        },
        {
          path: 'result-pdf',
          name: 'ResultExportPDF',
          component: ResultExportPDF
        },
        {
          path: 'result',
          name: 'Result',
          component: Result
        },
        {
          path: 'transaction',
          name: 'Transaction',
          component: Transaction
        },
        {
          path: 'user-register',
          name: 'User Register',
          component: UserRegister
        },
        {
          path: 'category',
          name: 'Category',
          component: Category
        },
        {
          path: 'product',
          name: 'Product',
          component: Product
        },
        {
          path: 'user',
          name: 'User data',
          component: MasterUser
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
          path: 'sbu',
          name: 'Sbu',
          component: Sbu
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

