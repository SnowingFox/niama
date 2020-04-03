import * as T from '@/<%= pkg.name %>/types';

export const menus: T.Nav.Menu[] = [
  {
    id: 'public',
    to: '',
    children: [
      { id: 'index', to: '/', icon: 'home', exact: true },
      { id: 'contact', to: '/contact' },
    ],
  },
];
