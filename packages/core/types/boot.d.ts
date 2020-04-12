import { AsyncSubject } from './externals';
import { Syncer } from './main';
import { SagaO } from './rx';

// CONFIG ==================================================================================================================================

export interface GetBootCfg <Opts = any, Provider = any, Raw = any, Services = any> {
  O: Opts;
  P: Provider;
  R: Raw;
  S: Services;
}

// BOOT ====================================================================================================================================

export interface GetBootP<BootCfg extends GetBootCfg> {
  initProvider: Syncer<BootCfg['P'], BootCfg['O']>;
  opts: BootCfg['O'];
}

// RAW =====================================================================================================================================

export interface GetRawCfg<BootCfg extends GetBootCfg> {
  $: AsyncSubject<BootCfg['R']>;
  loading: boolean;
}

// SERVICES ================================================================================================================================

export interface GetBootSagaP<BootCfg extends GetBootCfg, Done, Res, Src, Fail = null> extends SagaO<Done, Res, Fail> {
  act: ($: BootCfg['R'], ...src: [Src]) => Promise<Res>;
  mapError?: (e: Error) => Error;
  raw: GetRawCfg<BootCfg>;
}

export interface GetServiceO<BootCfg extends GetBootCfg> {
  opts: BootCfg['O'];
  raw: GetRawCfg<BootCfg>;
}
