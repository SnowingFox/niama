import { allServices, boot } from '@niama/auth';

export default ({ router, Vue }) => boot({ Vue, router, ...allServices });
