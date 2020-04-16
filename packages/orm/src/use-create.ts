import { useMutation } from '@niama/api';
import { pick, sagaDone, useLoadable, useSourcable } from '@niama/core';

import * as T from './typings';

export const useCreate = <C extends T.Cfg, D = C['ObC']['Po'], F = null>(p: T.CreateC<C, D, F>['UseP']): T.CreateC<C, D, F>['R'] => {
  const { fields, rp, ...rest } = p;
  const done = ({ data }: T.Api.QR<C['ObC']['Po']>) => sagaDone(pick(rest, ['always', 'done', 'onAlways', 'onDone']))(data![rp.L.create]);
  return useMutation({ mutation: rp.O.create(fields), notifyId: `${rp.L.singular}.op.create.Done`, ...rest, done });
};

export const useCreateL$ = <C extends T.Cfg, D = C['ObC']['Po'], F = null>(p: T.CreateC<C, D, F>['L$P']): T.CreateC<C, D, F>['L$R'] => {
  const { src$, ...rest } = p;
  return useLoadable({ src$, switcher: useCreate<C, D, F>(rest) });
};

export const useCreateS$ = <C extends T.Cfg, D = C['ObC']['Po'], F = null>(p: T.CreateC<C, D, F>['UseP']): T.CreateC<C, D, F>['S$R'] =>
  useSourcable({ switcher: useCreate<C, D, F>(p) });
