export const menus: C.Nav.Menu[] = [
  {
    id: 'public',
    to: '',
    children: [
      { id: 'home', to: '/', icon: 'home', exact: true },
      { id: 'about', to: '/a-propos' },
      { id: 'contact', to: '/contact' },
      { id: 'posts', to: '/articles' },
    ],
  },
];
