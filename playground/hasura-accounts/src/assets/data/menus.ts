import * as T from '@/hasura-accounts/types';

export const menus: T.Nav.Menu[] = [
  {
    id: 'public',
    to: '',
    children: [
      { id: 'home', to: '/', icon: 'home', exact: true },
      { id: 'profile', to: '/mon-profil' },
      { id: 'signin', to: '/connexion' },
      { id: 'signup', to: '/inscription' },
    ],
  },
];
