import * as T from '@/<%= package.name %>/types';

export const menus: T.Nav.Menu[] = [
  {
    id: 'public',
    to: '',
    children: [{ id: 'home', to: '/', icon: 'home', exact: true }],
  },
];
