import { apiS } from '@niama/api/front';
import { getNavInitialData, getNavRS } from '@niama/nav/front';

const menus: N.NavMenu[] = [
  {
    id: 'public',
    to: '',
    children: [{ id: 'index', to: '/' }, { id: 'posts', to: '/articles' }],
  },
];

export default apiS({
  initial: () => ({ ...getNavInitialData(menus) }),
  resolvers: [getNavRS()],
  rest: true,
  secured: true,
});
