export const admin = [
  {
    _name: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    // badge: {
    //   color: 'primary',
    //   text: 'NEW'
    // }
  },
  {
    _name: 'CSidebarNavTitle',
    _children: ['Menu']
  },

  {
    _name: 'CSidebarNavItem',
    name: 'Agenda Bappeda',
    to: '/agenda',
    icon: 'cil-calendar',
    // badge: {
    //   color: 'primary',
    //   text: 'NEW'
    // }
  },


  {
    _name: 'CSidebarNavDropdown',
    name: 'Data',
    route: '/data',
    icon: 'cil-file',
    items: [
      // {
      //   name: 'Dokumen OPD',
      //   to: '/data/dokumen-opd',
      // },
      {
        name: 'Tipe Dokumen',
        to: '/data/tipe-dokumen',
      },
      {
        name: 'Dokumen Peraturan',
        to: '/data/peraturan'
      },
      // {
      //   name: 'Dokumen Kota',
      //   to: '/data/kota'
      // },
      // {
      //   name: 'Jadwal Perencanaan',
      //   to: '/data/jadwal-perencanaan'
      // },
    ]
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Komunikasi',
    route: '/komunikasi',
    icon: 'cil-comment-square',
    items: [
      {
        name: 'Pesan',
        to: '/komunikasi/pesan',

      },
      {
        name: 'Online Chat',
        to: '/komunikasi/online-chat'
      },
    ]
  },

  {
    _name: 'CSidebarNavItem',
    name: 'History Layanan',
    to: '/history',
    icon: 'cil-grid'
  },
  // {
  //   _name: 'CSidebarNavItem',
  //   name: 'Laporan Harian',
  //   to: '/laporan-harian',
  //   icon: 'cil-pencil'
  // },
  // {
  //   _name: 'CSidebarNavItem',
  //   name: 'Laporan Masyarakat',
  //   to: '/laporan-masyarakat',
  //   icon: 'cil-pencil'
  // },
  {
    _name: 'CSidebarNavItem',
    name: 'Gallery',
    to: '/gallery',
    icon: 'cil-puzzle'
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Object Monitoring',
    route: '/object-monitoring',
    icon: 'cil-file',
    items: [
      {
        name: 'Paket Pekerjaan',
        to: '/paket-pekerjaan',
      },
      {
        name: 'Potensi Pasar',
        to: '/potensi-pasar'
      },
    ]
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Tenaga Kerja & Badan Usaha',
    route: '/',
    icon: 'cil-file',
    items: [
      {
        name: 'Data SBU',
        to: '/sbu',
      },
      {
        name: 'Data SKT',
        to: '/skt'
      },
      {
        name: 'Data SKA',
        to: '/ska'
      },
    ]
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Data Lainnya',
    route: '/',
    icon: 'cil-file',
    items: [
      {
        name: 'Data Quarry',
        to: '/quarry',
      },
      {
        name: 'Data Lab',
        to: '/lab',
      },
      {
        name: 'Data Sewa Alat Kontruksi',
        to: '/alat-kontruksi',
      },
    ]
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Master User',
    route: '/master-user',
    icon: 'cil-user',
    items: [
      {
        name: 'Kelola User',
        to: '/master-user/user',

      },
      // {
      //   name: 'Kelola OPD',
      //   to: '/master-user/opd'
      // },
      {
        name: 'Kelola Role',
        to: '/master-user/role'
      },

    ]
  },
]


export const opd = [
  {
    _name: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    // badge: {
    //   color: 'primary',
    //   text: 'NEW'
    // }
  },
  {
    _name: 'CSidebarNavTitle',
    _children: ['Menu']
  },

  {
    _name: 'CSidebarNavItem',
    name: 'Agenda Bappeda',
    to: '/agenda',
    icon: 'cil-calendar',
    // badge: {
    //   color: 'primary',
    //   text: 'NEW'
    // }
  },


  {
    _name: 'CSidebarNavDropdown',
    name: 'Data',
    route: '/data',
    icon: 'cil-file',
    items: [
      {
        name: 'Dokumen OPD',
        to: '/data/dokumen-opd',

      },

      {
        name: 'Dokumen Peraturan',
        to: '/data/peraturan'
      },
      {
        name: 'Dokumen Kota',
        to: '/data/kota'
      },
      {
        name: 'Jadwal Perencanaan',
        to: '/data/jadwal-perencanaan'
      },

    ]
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Komunikasi',
    route: '/komunikasi',
    icon: 'cil-comment-square',

    items: [
      {
        name: 'Pesan',
        to: '/komunikasi/pesan',

      },
      {
        name: 'Online Chat',
        to: '/komunikasi/online-chat'
      },

    ]
  },

  {
    _name: 'CSidebarNavItem',
    name: 'History Layanan',
    to: '/history',
    icon: 'cil-grid'
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Laporan Masyarakat',
    to: '/laporan-masyarakat',
    icon: 'cil-pencil'
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Gallery',
    to: '/gallery',
    icon: 'cil-puzzle'
  },
]

export const not_opd = [
  {
    _name: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    // badge: {
    //   color: 'primary',
    //   text: 'NEW'
    // }
  },
  {
    _name: 'CSidebarNavTitle',
    _children: ['Menu']
  },

  {
    _name: 'CSidebarNavItem',
    name: 'Agenda Bappeda',
    to: '/agenda',
    icon: 'cil-calendar',
    // badge: {
    //   color: 'primary',
    //   text: 'NEW'
    // }
  },


  {
    _name: 'CSidebarNavDropdown',
    name: 'Data',
    route: '/data',
    icon: 'cil-file',
    items: [
      {
        name: 'Dokumen OPD',
        to: '/data/dokumen-opd',

      },
      // {
      //   name: 'Tipe Dokumen',
      //   to: '/data/tipe-dokumen',

      // },
      {
        name: 'Dokumen Peraturan',
        to: '/data/peraturan'
      },
      {
        name: 'Dokumen Kota',
        to: '/data/kota'
      },
      {
        name: 'Jadwal Perencanaan',
        to: '/data/jadwal-perencanaan'
      },

    ]
  },
  {
    _name: 'CSidebarNavDropdown',
    name: 'Komunikasi',
    route: '/komunikasi',
    icon: 'cil-comment-square',

    items: [
      {
        name: 'Pesan',
        to: '/komunikasi/pesan',

      },
      {
        name: 'Online Chat',
        to: '/komunikasi/online-chat'
      },

    ]
  },

  {
    _name: 'CSidebarNavItem',
    name: 'History Layanan',
    to: '/history',
    icon: 'cil-grid'
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Laporan Harian',
    to: '/laporan-harian',
    icon: 'cil-pencil'
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Laporan Masyarakat',
    to: '/laporan-masyarakat',
    icon: 'cil-pencil'
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Gallery',
    to: '/gallery',
    icon: 'cil-puzzle'
  },

]