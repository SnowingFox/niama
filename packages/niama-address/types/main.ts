import { AsyncSubject } from 'rxjs';

import * as S from './service';

// BOOT ====================================================================================================================================

export interface BootP {
  ui?: Ui;
  Vue: any;
}

export type Ui = 'quasar';

// PROVIDER ================================================================================================================================

export interface Provider<Service = any> extends ProviderO {
  loading: boolean;
  service$: AsyncSubject<Service>;
}

export interface ProviderO {
  fromValue$?: (p: S.FromValueP) => S.FromValueR;
  suggestionsFromInput$?: (p: S.SuggestionsFromInputP) => S.SuggestionsFromInputR;
}
