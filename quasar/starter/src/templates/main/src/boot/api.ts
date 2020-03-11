import { bootLocalApi } from '@niama/api';
import { getNavRS, getNavSeed } from '@niama/nav';
import { boot } from 'quasar/wrappers';

import { menus } from '@/<%= package.name %/assets/data/menus';

export default boot(() => bootLocalApi({ resolvers: [getNavRS()], seeds: [() => getNavSeed({ menus })] }));
