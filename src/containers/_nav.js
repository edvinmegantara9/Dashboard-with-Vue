export default [
  {
    _name: 'CSidebarNav',
    _children: [
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
        _name: 'CSidebarNavDropdown',
        name: 'Agenda Bappeda',
        route: '/agenda',
        icon: 'cil-calendar',
        items: [
          {
            name: 'Daftar Agenda',
            to: '/agenda/list',
           
          },
          {
            name: 'Detail Agenda',
            to: '/agenda/detail',
           
          },
         
        
        ]
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
            name: 'Tipe Dokumen',
            to: '/data/tipe-dokumen',
           
          },
          {
            name: 'Download',
            to: '/data/download'
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
        name: 'Gallery',
        to: '/gallery',
        icon: 'cil-puzzle'
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Master User',
        route: '/master-user',
        icon: 'cil-user',
        items: [
          {
            name: 'User',
            to: '/master-user/user',
           
          },
          {
            name: 'OPD',
            to: '/master-user/opd'
          },

          {
            name: 'Role',
            to: '/master-user/role'
          },
        
        ]
      },
     
    ]
  }
]