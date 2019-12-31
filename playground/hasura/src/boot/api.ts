import { boot } from '@niama/api';
import { getNavInitialData, getNavRS } from '@niama/nav';

import { menus } from '@/hasura/assets/data/menus';

export default ({ app, Vue }) => boot({ app, Vue, debug: true, http: true, initial: () => getNavInitialData({ menus }), resolvers: [getNavRS()] });
