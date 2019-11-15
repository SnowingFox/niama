import { bootApi } from '@niama/api-client';
import { getInitialData as getNavInitialData, getRS as getNavRS } from '@niama/nav-client';

import { menus } from '@/assets/data/f.menus';

export default async ({ app, Vue }) => {
  await bootApi({
    app,
    Vue,
    initial: () => getNavInitialData(menus),
    resolvers: [getNavRS()],
    rest: true,
  });
};
