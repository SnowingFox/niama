import * as T from '@/hasura/types';

export const menus: T.Nav.Menu[] = [
  {
    id: 'public',
    to: '',
    children: [
      { id: 'home', to: '/', icon: 'home', exact: true },
      { id: 'signin', to: '/connexion' },
      { id: 'signup', to: '/inscription' },
    ],
  },
];
