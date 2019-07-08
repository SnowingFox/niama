import { navLabels } from '@niama/nav';
import { getRequests, OrmConfig, OrmRequests, resourceMinF } from '@niama/orm-client';

import { NavF } from './types';

const fields: NavF = [ ...resourceMinF, 'exact', 'icon', 'order', 'parent', 'to'];
const requests: OrmRequests<NavF> = getRequests<NavF>(fields, navLabels, false);

export const api: OrmConfig<NavF> = { fields, labels: navLabels, requests };
