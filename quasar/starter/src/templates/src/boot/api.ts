import { bootLocalApi } from '@niama/api';
import { getNavRS, getNavSeed } from '@niama/nav';
import { boot } from 'quasar/wrappers';

import { menus } from '@/<%= pkg.name %>/modules/app';

export default boot(() => bootLocalApi({ resolvers: [getNavRS()], seeds: [() => getNavSeed({ menus })] }));
