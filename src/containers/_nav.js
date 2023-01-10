export const admin = [
  {
    _name: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _name: 'CSidebarNavTitle',
    _children: ['Menu']
  },
  {
    _name: 'CSidebarNavItem',
    name: 'User Result',
    to: '/result',
    icon: 'cil-puzzle'
  },
  {
    _name: 'CSidebarNavItem',
    name: 'User Transaksi',
    to: '/transaction',
    icon: 'cil-puzzle'
  },
  {
    _name: 'CSidebarNavItem',
    name: 'User Register',
    to: '/user-register',
    icon: 'cil-user'
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Master',
    route: '/master',
    icon: 'cil-file',
    items: [
      {
        name: 'Kelola Produk',
        to: 'product',
      },
      {
        name: 'Kelola Polres',
        to: 'category',
      },
      {
        name: 'Kelola Profil Perusahaan',
        to: 'company',
      },
      {
        name: 'Kelola Admin',
        to: 'user',
      },
    ]
  },
]