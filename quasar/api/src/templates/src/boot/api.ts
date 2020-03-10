import { bootLocalApi } from '@niama/api';
import { boot } from 'quasar/wrappers';

export default boot(async () => await bootLocalApi());
