export const admin = [
  // {
  //   _name: 'CSidebarNavItem',
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: 'cil-speedometer',
  // },
  {
    _name: 'CSidebarNavTitle',
    _children: ['Menu']
  },
  // {
  //   _name: 'CSidebarNavItem',
  //   name: 'List Donasi',
  //   to: '/donasi',
  //   icon: 'cil-puzzle'
  // },
  {
    _name: 'CSidebarNavItem',
    name: 'List Restaurant',
    to: '/restaurant',
    icon: 'cil-puzzle'
  },
  {
    _name: 'CSidebarNavItem',
    name: 'List Donasi',
    to: '/donasi',
    icon: 'cil-puzzle'
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Master',
    route: '/master',
    icon: 'cil-file',
    items: [
      {
        name: 'Kelola User',
        to: 'user',
      },
      {
        name: 'Kelola Role',
        to: 'role',
      },
    ]
  },
]

export const restaurant = [
    // {
    //   _name: 'CSidebarNavItem',
    //   name: 'Dashboard',
    //   to: '/dashboard',
    //   icon: 'cil-speedometer',
    // },
    {
      _name: 'CSidebarNavTitle',
      _children: ['Menu']
    },
    {
      _name: 'CSidebarNavItem',
      name: 'List Donasi',
      to: '/donasi',
      icon: 'cil-puzzle'
    },
    // {
    //   _name: 'CSidebarNavDropdown',
    //   name: 'Master',
    //   route: '/master',
    //   icon: 'cil-file',
    //   items: [
    //     {
    //       name: 'Kelola Produk',
    //       to: 'product',
    //     },
    //     {
    //       name: 'Kelola Profil Perusahaan',
    //       to: 'company',
    //     },
    //     {
    //       name: 'Kelola Admin',
    //       to: 'user',
    //     },
    //   ]
    // },
  ]