import { NiamaProvider } from './main';

// PARAMS ==================================================================================================================================

export interface NotifyP {
  $niama: Pick<NiamaProvider, 'i18n'>;
  classes?: string;
  icon?: string;
  messageId: string;
}