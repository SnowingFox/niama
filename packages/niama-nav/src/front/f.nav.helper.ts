import { getRequests, resourceMinF } from '@niama/orm/front';

import { labels } from '../universal/u.nav.helper';

const fields: N.NavF = [ ...resourceMinF, 'exact', 'icon', 'order', 'parent', 'to'];
const requests: N.OrmRequests<N.NavF> = getRequests<N.NavF>(fields, labels, false);

export const api: N.OrmConfig<N.NavF> = { fields, labels, requests };
